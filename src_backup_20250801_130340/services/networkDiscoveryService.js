/**
 * networkDiscoveryService.js
 * 
 * Service to discover networks using external APIs.
 */

import axios from 'axios';
import NetworkConfiguration from '../models/NetworkConfiguration';

class NetworkDiscoveryService {
  /**
   * Discover new networks and update existing ones
   */
  async discoverNetworks() {
    try {
      // Call external API to get network data
      const networksData = await this.fetchNetworkData();

      // Iterate through each network and update/create in the database
      for (const network of networksData) {
        await this.upsertNetworkConfiguration(network);
      }

      console.log('Network discovery completed successfully.');
    } catch (error) {
      console.error('Error discovering networks:', error);
    }
  }

  /**
   * Fetch network data from an external API
   */
  async fetchNetworkData() {
    const response = await axios.get('https://api.example.com/networks');
    return response.data;
  }

  /**
   * Upsert a network configuration in the database
   */
  async upsertNetworkConfiguration(networkData) {
    const query = { networkId: networkData.networkId };
    const update = {
      name: networkData.name,
      type: networkData.type,
      status: networkData.status || 'ACTIVE',
      region: networkData.region,
      supportedCurrencies: networkData.supportedCurrencies,
      configuration: networkData.configuration,
      processors: networkData.processors,
      discoveryInfo: {
        discoveredBy: 'API_DISCOVERY',
        discoveredAt: new Date(),
        lastUpdated: new Date(),
        isHealthy: true
      }
    };

    await NetworkConfiguration.findOneAndUpdate(query, update, { upsert: true, new: true });
  }
}

export default new NetworkDiscoveryService();

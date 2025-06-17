const express = require('express');
const router = express.Router();
const metrics = require('../config/metrics');

router.get('/metrics', async (req, res) => {
  res.set('Content-Type', metrics.register.contentType);
  res.end(await metrics.register.metrics());
});

router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

router.get('/status', async (req, res) => {
  const status = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    connections: await getConnectionStatus(),
    services: await checkServices()
  };
  res.json(status);
});

module.exports = router;

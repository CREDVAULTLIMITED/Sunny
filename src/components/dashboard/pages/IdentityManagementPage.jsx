import React, { useState, useEffect } from 'react';
import './IdentityManagementPage.css';

const IdentityManagementPage = () => {
  const [identities, setIdentities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIdentity, setNewIdentity] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'US'
  });

  useEffect(() => {
    const fetchIdentities = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would be an API call
        // For now, we'll simulate the data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockIdentities = [
          {
            id: 'id_123456',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1234567890',
            country: 'US',
            verificationLevel: 'enhanced',
            status: 'active',
            createdAt: '2023-01-15T10:30:00Z',
            aliases: [
              { type: 'email', value: 'john.doe@example.com' },
              { type: 'phone', value: '+1234567890' },
              { type: 'username', value: 'johndoe' }
            ],
            linkedAccounts: [
              { type: 'bank_account', name: 'Chase Bank', last4: '4567' },
              { type: 'card', name: 'Visa', last4: '1234' }
            ]
          },
          {
            id: 'id_234567',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '+2345678901',
            country: 'GB',
            verificationLevel: 'document',
            status: 'active',
            createdAt: '2023-02-20T14:45:00Z',
            aliases: [
              { type: 'email', value: 'jane.smith@example.com' },
              { type: 'phone', value: '+2345678901' }
            ],
            linkedAccounts: [
              { type: 'bank_account', name: 'Barclays', last4: '8901' }
            ]
          },
          {
            id: 'id_345678',
            firstName: 'Robert',
            lastName: 'Johnson',
            email: 'robert.johnson@example.com',
            phone: '+3456789012',
            country: 'CA',
            verificationLevel: 'phone',
            status: 'pending',
            createdAt: '2023-03-10T09:15:00Z',
            aliases: [
              { type: 'email', value: 'robert.johnson@example.com' },
              { type: 'phone', value: '+3456789012' }
            ],
            linkedAccounts: []
          },
          {
            id: 'id_456789',
            firstName: 'Maria',
            lastName: 'Garcia',
            email: 'maria.garcia@example.com',
            phone: '+4567890123',
            country: 'ES',
            verificationLevel: 'email',
            status: 'active',
            createdAt: '2023-04-05T16:20:00Z',
            aliases: [
              { type: 'email', value: 'maria.garcia@example.com' },
              { type: 'phone', value: '+4567890123' }
            ],
            linkedAccounts: [
              { type: 'card', name: 'Mastercard', last4: '5678' }
            ]
          },
          {
            id: 'id_567890',
            firstName: 'David',
            lastName: 'Kim',
            email: 'david.kim@example.com',
            phone: '+5678901234',
            country: 'KR',
            verificationLevel: 'basic',
            status: 'inactive',
            createdAt: '2023-05-12T11:10:00Z',
            aliases: [
              { type: 'email', value: 'david.kim@example.com' }
            ],
            linkedAccounts: []
          }
        ];
        
        setIdentities(mockIdentities);
        setError(null);
      } catch (err) {
        console.error('Error fetching identities:', err);
        setError('Failed to load identity data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdentities();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIdentity(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddIdentity = (e) => {
    e.preventDefault();
    
    // In a real implementation, this would be an API call
    // For now, we'll just add to the local state
    
    const newId = {
      id: `id_${Math.floor(Math.random() * 1000000)}`,
      ...newIdentity,
      verificationLevel: 'basic',
      status: 'pending',
      createdAt: new Date().toISOString(),
      aliases: [
        { type: 'email', value: newIdentity.email },
        { type: 'phone', value: newIdentity.phone }
      ],
      linkedAccounts: []
    };
    
    setIdentities(prev => [newId, ...prev]);
    setShowAddModal(false);
    setNewIdentity({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: 'US'
    });
  };

  const filteredIdentities = identities.filter(identity => {
    // Filter by search term
    const searchMatch = 
      identity.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      identity.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      identity.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      identity.phone.includes(searchTerm) ||
      identity.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    const tabMatch = 
      activeTab === 'all' ||
      (activeTab === 'active' && identity.status === 'active') ||
      (activeTab === 'pending' && identity.status === 'pending') ||
      (activeTab === 'inactive' && identity.status === 'inactive');
    
    return searchMatch && tabMatch;
  });

  const getVerificationBadgeClass = (level) => {
    switch (level) {
      case 'enhanced':
        return 'verification-badge enhanced';
      case 'document':
        return 'verification-badge document';
      case 'phone':
        return 'verification-badge phone';
      case 'email':
        return 'verification-badge email';
      default:
        return 'verification-badge basic';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'status-badge active';
      case 'pending':
        return 'status-badge pending';
      case 'inactive':
        return 'status-badge inactive';
      default:
        return 'status-badge';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="identity-management-page">
      <div className="page-header">
        <div>
          <h1>Identity Management</h1>
          <p className="page-description">
            Manage customer identities and multi-ID resolution
          </p>
        </div>
        <button 
          className="add-identity-button"
          onClick={() => setShowAddModal(true)}
        >
          Add Identity
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="identity-controls">
        <div className="search-container">
          <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, phone or ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <div className="identity-tabs">
          <button 
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button 
            className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            className={`tab-button ${activeTab === 'inactive' ? 'active' : ''}`}
            onClick={() => setActiveTab('inactive')}
          >
            Inactive
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading identities...</p>
        </div>
      ) : (
        <div className="identities-table-container">
          <table className="identities-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Verification</th>
                <th>Status</th>
                <th>Created</th>
                <th>Aliases</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIdentities.length > 0 ? (
                filteredIdentities.map(identity => (
                  <tr key={identity.id}>
                    <td className="identity-id">{identity.id}</td>
                    <td className="identity-name">
                      <div className="name-with-country">
                        <span>{identity.firstName} {identity.lastName}</span>
                        <span className="country-code">{identity.country}</span>
                      </div>
                    </td>
                    <td className="identity-contact">
                      <div className="contact-info">
                        <div className="email">{identity.email}</div>
                        <div className="phone">{identity.phone}</div>
                      </div>
                    </td>
                    <td className="identity-verification">
                      <span className={getVerificationBadgeClass(identity.verificationLevel)}>
                        {identity.verificationLevel}
                      </span>
                    </td>
                    <td className="identity-status">
                      <span className={getStatusBadgeClass(identity.status)}>
                        {identity.status}
                      </span>
                    </td>
                    <td className="identity-created">
                      {formatDate(identity.createdAt)}
                    </td>
                    <td className="identity-aliases">
                      <div className="alias-count">
                        {identity.aliases.length} aliases
                      </div>
                    </td>
                    <td className="identity-actions">
                      <button className="action-button view">View</button>
                      <button className="action-button edit">Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-identities">
                    No identities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Identity</h2>
              <button 
                className="close-button"
                onClick={() => setShowAddModal(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddIdentity}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={newIdentity.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={newIdentity.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newIdentity.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newIdentity.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={newIdentity.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="IN">India</option>
                  <option value="BR">Brazil</option>
                  <option value="ZA">South Africa</option>
                </select>
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Add Identity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentityManagementPage;
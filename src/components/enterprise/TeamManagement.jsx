import React, { useState, useEffect, useCallback } from 'react';
import { useSunny } from '../../sdk/SunnyReactSDK.js';
import ErrorBoundary from '../common/ErrorBoundary.jsx';
import './TeamManagement.css';

// Role definitions with descriptions and permissions
const ROLES = {
  'admin': {
    label: 'Administrator',
    description: 'Full access to all system features and settings',
    permissions: ['read', 'write', 'delete', 'invite', 'manage_roles', 'manage_settings', 'view_reports', 'process_payments', 'api_access']
  },
  'manager': {
    label: 'Manager',
    description: 'Can manage team members and view all reports',
    permissions: ['read', 'write', 'invite', 'view_reports', 'process_payments', 'api_access']
  },
  'accountant': {
    label: 'Accountant',
    description: 'Access to financial reports and payment processing',
    permissions: ['read', 'process_payments', 'view_reports']
  },
  'analyst': {
    label: 'Analyst',
    description: 'Can view reports and analytics',
    permissions: ['read', 'view_reports']
  },
  'developer': {
    label: 'Developer',
    description: 'API access and technical settings',
    permissions: ['read', 'api_access']
  },
  'support': {
    label: 'Support',
    description: 'Customer support capabilities',
    permissions: ['read', 'write', 'view_reports']
  },
  'readonly': {
    label: 'Read Only',
    description: 'Can only view information',
    permissions: ['read']
  }
};

// Permission definitions
const PERMISSIONS = {
  'read': { label: 'Read', description: 'View information' },
  'write': { label: 'Write', description: 'Create and edit records' },
  'delete': { label: 'Delete', description: 'Remove records from the system' },
  'invite': { label: 'Invite', description: 'Invite new team members' },
  'manage_roles': { label: 'Manage Roles', description: 'Assign and modify roles' },
  'manage_settings': { label: 'Manage Settings', description: 'Change system settings' },
  'view_reports': { label: 'View Reports', description: 'Access reporting and analytics' },
  'process_payments': { label: 'Process Payments', description: 'Create and manage payments' },
  'api_access': { label: 'API Access', description: 'Access the API and developer tools' }
};

// Sample data for members (would come from API in real implementation)
const SAMPLE_MEMBERS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastActive: '2025-05-22T10:30:45Z',
    avatar: null
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'manager',
    status: 'active',
    lastActive: '2025-05-21T16:45:22Z',
    avatar: null
  },
  {
    id: '3',
    name: 'Miguel Rodriguez',
    email: 'miguel@example.com',
    role: 'accountant',
    status: 'active',
    lastActive: '2025-05-20T09:15:33Z',
    avatar: null
  },
  {
    id: '4',
    name: 'Emma Chen',
    email: 'emma@example.com',
    role: 'analyst',
    status: 'invited',
    lastActive: null,
    avatar: null
  }
];

// Sample activity log (would come from API in real implementation)
const SAMPLE_ACTIVITY = [
  {
    id: '1',
    userId: '1',
    action: 'invite_user',
    details: 'Invited Emma Chen (emma@example.com)',
    timestamp: '2025-05-21T14:32:10Z'
  },
  {
    id: '2',
    userId: '2',
    action: 'change_role',
    details: 'Changed Miguel Rodriguez from Developer to Accountant',
    timestamp: '2025-05-19T11:23:45Z'
  },
  {
    id: '3',
    userId: '1',
    action: 'login',
    details: 'Logged in from 192.168.1.105',
    timestamp: '2025-05-22T10:30:15Z'
  }
];

const TeamManagement = () => {
  const { sdk } = useSunny();
  
  // State for team members
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberLoading, setMemberLoading] = useState(true);
  const [memberError, setMemberError] = useState(null);
  
  // State for activity log
  const [activityLog, setActivityLog] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState(null);
  
  // State for invitation form
  const [inviteForm, setInviteForm] = useState({
    email: '',
    name: '',
    role: 'readonly'
  });
  const [inviteFormErrors, setInviteFormErrors] = useState({});
  const [isInviting, setIsInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(null);
  
  // State for custom role editor
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [currentCustomRole, setCurrentCustomRole] = useState(null);
  
  // State for permission settings
  const [selectedTab, setSelectedTab] = useState('members');
  
  // Fetch team members
  const fetchMembers = useCallback(async () => {
    setMemberLoading(true);
    setMemberError(null);
    
    try {
      // In a real implementation, this would call the SDK
      // const response = await sdk.getTeamMembers();
      
      // Using sample data for now
      setTimeout(() => {
        setMembers(SAMPLE_MEMBERS);
        setMemberLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setMemberError('Failed to load team members. Please try again.');
      setMemberLoading(false);
    }
  }, [sdk]);
  
  // Fetch activity log
  const fetchActivityLog = useCallback(async () => {
    setActivityLoading(true);
    setActivityError(null);
    
    try {
      // In a real implementation, this would call the SDK
      // const response = await sdk.getTeamActivity();
      
      // Using sample data for now
      setTimeout(() => {
        setActivityLog(SAMPLE_ACTIVITY);
        setActivityLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching activity log:', error);
      setActivityError('Failed to load activity log. Please try again.');
      setActivityLoading(false);
    }
  }, [sdk]);
  
  // Load initial data
  useEffect(() => {
    fetchMembers();
    fetchActivityLog();
  }, [fetchMembers, fetchActivityLog]);
  
  // Invite a new member
  const handleInvite = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!inviteForm.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(inviteForm.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!inviteForm.name) {
      errors.name = 'Name is required';
    }
    
    if (Object.keys(errors).length > 0) {
      setInviteFormErrors(errors);
      return;
    }
    
    setInviteFormErrors({});
    setIsInviting(true);
    
    try {
      // In a real implementation, this would call the SDK
      // await sdk.inviteTeamMember(inviteForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add the new member to the list (in a real app, you'd refresh the list)
      const newMember = {
        id: 'temp-' + Date.now(),
        name: inviteForm.name,
        email: inviteForm.email,
        role: inviteForm.role,
        status: 'invited',
        lastActive: null,
        avatar: null
      };
      
      setMembers(prevMembers => [...prevMembers, newMember]);
      
      // Add to activity log
      const newActivity = {
        id: 'temp-' + Date.now(),
        userId: '1', // Current user ID would be used in a real app
        action: 'invite_user',
        details: `Invited ${inviteForm.name} (${inviteForm.email})`,
        timestamp: new Date().toISOString()
      };
      
      setActivityLog(prevActivity => [newActivity, ...prevActivity]);
      
      // Reset form
      setInviteForm({
        email: '',
        name: '',
        role: 'readonly'
      });
      
      setInviteSuccess(`Invitation sent to ${inviteForm.email}`);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setInviteSuccess(null);
      }, 5000);
    } catch (error) {
      console.error('Error inviting team member:', error);
      setInviteFormErrors({
        form: 'Failed to send invitation. Please try again.'
      });
    } finally {
      setIsInviting(false);
    }
  };
  
  // Handle changing a member's role
  const handleRoleChange = async (memberId, newRole) => {
    try {
      // In a real implementation, this would call the SDK
      // await sdk.updateTeamMemberRole(memberId, newRole);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the member in the list
      setMembers(prevMembers => 
        prevMembers.map(member => 
          member.id === memberId ? { ...member, role: newRole } : member
        )
      );
      
      // Add to activity log
      const member = members.find(m => m.id === memberId);
      const newActivity = {
        id: 'temp-' + Date.now(),
        userId: '1', // Current user ID would be used in a real app
        action: 'change_role',
        details: `Changed ${member.name}'s role to ${ROLES[newRole].label}`,
        timestamp: new Date().toISOString()
      };
      
      setActivityLog(prevActivity => [newActivity, ...prevActivity]);
      
      // Show success message (in a real app)
      console.log(`Updated ${member.name}'s role to ${ROLES[newRole].label}`);
    } catch (error) {
      console.error('Error updating team member role:', error);
      alert('Failed to update role. Please try again.');
    }
  };
  
  // Handle removing a member
  const handleRemoveMember = async (memberId) => {
    if (!confirm('Are you sure you want to remove this team member?')) {
      return;
    }
    
    try {
      // In a real implementation, this would call the SDK
      // await sdk.removeTeamMember(memberId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the member name before removing
      const member = members.find(m => m.id === memberId);
      
      // Remove the member from the list
      setMembers(prevMembers => 
        prevMembers.filter(member => member.id !== memberId)
      );
      
      // Add to activity log
      const newActivity = {
        id: 'temp-' + Date.now(),
        userId: '1', // Current user ID would be used in a real app
        action: 'remove_user',
        details: `Removed ${member.name} (${member.email})`,
        timestamp: new Date().toISOString()
      };
      
      setActivityLog(prevActivity => [newActivity, ...prevActivity]);
      
      // Show success message (in a real app)
      console.log(`Removed ${member.name} from the team`);
    } catch (error) {
      console.error('Error removing team member:', error);
      alert('Failed to remove team member. Please try again.');
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'invited':
        return 'badge-warning';
      case 'inactive':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  };
  
  // Get avatar initials
  const getInitials = (name) => {
    if (!name) return '?';
    
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  
  // Render members list
  const renderMembersList = () => {
    if (memberLoading) {
      return (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading team members...</p>
        </div>
      );
    }
    
    if (memberError) {
      return (
        <div className="error-message">
          <p>{memberError}</p>
          <button className="retry-button" onClick={fetchMembers}>Retry</button>
        </div>
      );
    }
    
    if (members.length === 0) {
      return (
        <div className="empty-state">
          <p>No team members found</p>
        </div>
      );
    }
    
    return (
      <div className="members-list">
        <table className="team-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Actions</th>
            


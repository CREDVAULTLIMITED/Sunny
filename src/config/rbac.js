/**
 * Role-Based Access Control Configuration
 */

module.exports = {
    roles: {
        admin: {
            description: 'System Administrator',
            permissions: ['*']
        },
        paymentManager: {
            description: 'Payment Operations Manager',
            permissions: [
                'payment:read',
                'payment:write',
                'payment:refund',
                'report:read'
            ]
        },
        accountant: {
            description: 'Financial Accountant',
            permissions: [
                'payment:read',
                'report:read',
                'transaction:read'
            ]
        },
        support: {
            description: 'Customer Support',
            permissions: [
                'payment:read',
                'customer:read',
                'ticket:read',
                'ticket:write'
            ]
        },
        merchant: {
            description: 'Merchant User',
            permissions: [
                'payment:read',
                'payment:write',
                'report:read',
                'account:read'
            ]
        }
    },
    permissions: {
        'payment:read': 'View payment information',
        'payment:write': 'Create and update payments',
        'payment:refund': 'Process payment refunds',
        'report:read': 'View financial reports',
        'transaction:read': 'View transaction details',
        'customer:read': 'View customer information',
        'ticket:read': 'View support tickets',
        'ticket:write': 'Create and update support tickets',
        'account:read': 'View account information',
        '*': 'Full system access'
    },
    policies: {
        mfaRequired: ['payment:refund', 'account:write'],
        auditLogged: ['payment:write', 'payment:refund', 'customer:write'],
        rateLimited: ['payment:write', 'api:*']
    },
    defaults: {
        role: 'merchant',
        permissions: ['payment:read']
    }
};

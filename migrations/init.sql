-- Database initialization script for Sunny Payment Gateway

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create tables
CREATE TABLE IF NOT EXISTS merchants (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  api_key VARCHAR(64) NOT NULL UNIQUE,
  api_secret VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions (
  id VARCHAR(50) PRIMARY KEY,
  merchant_id VARCHAR(50) NOT NULL REFERENCES merchants(id),
  amount DECIMAL(19, 4) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  status VARCHAR(20) NOT NULL,
  payment_method VARCHAR(30) NOT NULL,
  customer_id VARCHAR(50),
  description TEXT,
  metadata JSONB DEFAULT '{}',
  processor_response JSONB DEFAULT '{}',
  error_code VARCHAR(50),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_transactions_merchant_id ON transactions(merchant_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR(50) PRIMARY KEY,
  merchant_id VARCHAR(50) NOT NULL REFERENCES merchants(id),
  email VARCHAR(255),
  name VARCHAR(255),
  phone VARCHAR(50),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_customers_merchant_id ON customers(merchant_id);
CREATE INDEX idx_customers_email ON customers(email);

CREATE TABLE IF NOT EXISTS payment_methods (
  id VARCHAR(50) PRIMARY KEY,
  customer_id VARCHAR(50) NOT NULL REFERENCES customers(id),
  type VARCHAR(30) NOT NULL,
  provider VARCHAR(30) NOT NULL,
  token VARCHAR(255) NOT NULL,
  last_four VARCHAR(4),
  expiry_month VARCHAR(2),
  expiry_year VARCHAR(4),
  is_default BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_payment_methods_customer_id ON payment_methods(customer_id);

CREATE TABLE IF NOT EXISTS settlements (
  id VARCHAR(50) PRIMARY KEY,
  merchant_id VARCHAR(50) NOT NULL REFERENCES merchants(id),
  amount DECIMAL(19, 4) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  status VARCHAR(20) NOT NULL,
  destination_account VARCHAR(255) NOT NULL,
  transaction_ids JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_settlements_merchant_id ON settlements(merchant_id);
CREATE INDEX idx_settlements_status ON settlements(status);

CREATE TABLE IF NOT EXISTS webhooks (
  id VARCHAR(50) PRIMARY KEY,
  merchant_id VARCHAR(50) NOT NULL REFERENCES merchants(id),
  url VARCHAR(255) NOT NULL,
  events JSONB NOT NULL,
  secret VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_webhooks_merchant_id ON webhooks(merchant_id);

CREATE TABLE IF NOT EXISTS webhook_events (
  id VARCHAR(50) PRIMARY KEY,
  webhook_id VARCHAR(50) NOT NULL REFERENCES webhooks(id),
  event_type VARCHAR(50) NOT NULL,
  payload JSONB NOT NULL,
  status VARCHAR(20) NOT NULL,
  attempts INT DEFAULT 0,
  last_attempt_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_webhook_events_webhook_id ON webhook_events(webhook_id);
CREATE INDEX idx_webhook_events_status ON webhook_events(status);

-- Create audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(50) NOT NULL,
  action VARCHAR(50) NOT NULL,
  actor VARCHAR(50) NOT NULL,
  changes JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Create function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating updated_at
CREATE TRIGGER update_merchants_modtime
BEFORE UPDATE ON merchants
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_transactions_modtime
BEFORE UPDATE ON transactions
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_customers_modtime
BEFORE UPDATE ON customers
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_payment_methods_modtime
BEFORE UPDATE ON payment_methods
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_settlements_modtime
BEFORE UPDATE ON settlements
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_webhooks_modtime
BEFORE UPDATE ON webhooks
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_webhook_events_modtime
BEFORE UPDATE ON webhook_events
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
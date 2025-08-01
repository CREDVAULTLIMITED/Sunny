#!/bin/bash

echo "Setting up MongoDB Production Cluster..."

# Variables
MONGO_NODES=3
REPLICA_SET="rs0"
SSL_DIR="docker/production/ssl/mongodb"

# Create SSL directory
mkdir -p $SSL_DIR

# Generate SSL certificates for MongoDB
openssl rand -base64 741 > $SSL_DIR/mongodb-keyfile
chmod 600 $SSL_DIR/mongodb-keyfile

# Create root CA
openssl req -nodes -x509 -newkey rsa:4096 -days 365 \
    -keyout $SSL_DIR/ca.key -out $SSL_DIR/ca.crt \
    -subj "/C=US/ST=CA/L=SanFrancisco/O=SunnyPayments/CN=MongoCA"

# Generate certificates for each node
for i in $(seq 1 $MONGO_NODES); do
    openssl req -nodes -newkey rsa:4096 \
        -keyout $SSL_DIR/mongo${i}.key -out $SSL_DIR/mongo${i}.csr \
        -subj "/C=US/ST=CA/L=SanFrancisco/O=SunnyPayments/CN=mongo${i}"
    
    openssl x509 -req -days 365 \
        -in $SSL_DIR/mongo${i}.csr -CA $SSL_DIR/ca.crt \
        -CAkey $SSL_DIR/ca.key -CAcreateserial \
        -out $SSL_DIR/mongo${i}.crt
    
    cat $SSL_DIR/mongo${i}.key $SSL_DIR/mongo${i}.crt > $SSL_DIR/mongo${i}.pem
done

# Create MongoDB configuration for each node
for i in $(seq 1 $MONGO_NODES); do
    cat > docker/production/mongo${i}.conf << EOL
storage:
  dbPath: /data/db
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 0.0.0.0
  ssl:
    mode: requireSSL
    PEMKeyFile: /etc/ssl/mongodb/mongo${i}.pem
    CAFile: /etc/ssl/mongodb/ca.crt

replication:
  replSetName: ${REPLICA_SET}

security:
  keyFile: /etc/ssl/mongodb/mongodb-keyfile
  authorization: enabled
EOL
done

# Update docker-compose.yml for MongoDB cluster
cat > docker/production/docker-compose.mongodb.yml << EOL
version: '3.8'

services:
  mongo1:
    image: mongo:6.0
    command: mongod --config /etc/mongod.conf
    volumes:
      - ./mongo1.conf:/etc/mongod.conf
      - ./ssl/mongodb:/etc/ssl/mongodb
      - mongo1-data:/data/db
    networks:
      - mongo-cluster

  mongo2:
    image: mongo:6.0
    command: mongod --config /etc/mongod.conf
    volumes:
      - ./mongo2.conf:/etc/mongod.conf
      - ./ssl/mongodb:/etc/ssl/mongodb
      - mongo2-data:/data/db
    networks:
      - mongo-cluster

  mongo3:
    image: mongo:6.0
    command: mongod --config /etc/mongod.conf
    volumes:
      - ./mongo3.conf:/etc/mongod.conf
      - ./ssl/mongodb:/etc/ssl/mongodb
      - mongo3-data:/data/db
    networks:
      - mongo-cluster

volumes:
  mongo1-data:
  mongo2-data:
  mongo3-data:

networks:
  mongo-cluster:
    driver: overlay
EOL

# Create replica set initialization script
cat > scripts/init-replica-set.js << EOL
rs.initiate({
  _id: "${REPLICA_SET}",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" }
  ]
})
EOL

# Update environment configuration
cat >> .env.production << EOL

# MongoDB Cluster Configuration
MONGODB_URI=mongodb://mongo1:27017,mongo2:27017,mongo3:27017/${DB_NAME}?replicaSet=${REPLICA_SET}&ssl=true
MONGODB_SSL_CA_FILE=/etc/ssl/mongodb/ca.crt
MONGODB_SSL_CERT_FILE=/etc/ssl/mongodb/mongo1.pem
MONGODB_REPLICA_SET=${REPLICA_SET}
EOL

echo "MongoDB cluster configuration completed!"
echo "Please run 'docker-compose -f docker/production/docker-compose.mongodb.yml up -d' to start the cluster"

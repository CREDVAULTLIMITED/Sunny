const mongoose = require('mongoose');
const config = require('./config');

// Index configuration
const INDEXES = {
  payments: [
    { fields: { createdAt: -1 }, options: { background: true } },
    { fields: { userId: 1, createdAt: -1 }, options: { background: true } },
    { fields: { status: 1, createdAt: -1 }, options: { background: true } },
    { fields: { 'paymentMethod.type': 1 }, options: { background: true } }
  ],
  users: [
    { fields: { email: 1 }, options: { unique: true, background: true } },
    { fields: { 'paymentMethods.default': 1 }, options: { background: true } }
  ],
  transactions: [
    { fields: { userId: 1, createdAt: -1 }, options: { background: true } },
    { fields: { status: 1, createdAt: -1 }, options: { background: true } },
    { fields: { 'paymentDetails.type': 1 }, options: { background: true } }
  ]
};

// Query optimization rules
const QUERY_OPTIMIZATIONS = {
  // Use lean() for read-only operations
  lean: (query) => {
    if (query.op === 'find' || query.op === 'findOne') {
      return query.lean();
    }
    return query;
  },

  // Add pagination limits
  paginate: (query, defaultLimit = 100) => {
    if (!query.options.limit) {
      query.limit(defaultLimit);
    }
    return query;
  },

  // Select only needed fields
  selectFields: (query, fields) => {
    if (fields && !query.selectedFields) {
      return query.select(fields.join(' '));
    }
    return query;
  },

  // Use covered queries where possible
  coverIndex: (query, model) => {
    const indexKeys = Object.keys(model.schema.indexes());
    const queryFields = Object.keys(query._conditions);
    
    if (queryFields.every(field => indexKeys.includes(field))) {
      return query.select(queryFields.join(' '));
    }
    return query;
  }
};

// Apply indexes
async function setupIndexes() {
  for (const [modelName, indexes] of Object.entries(INDEXES)) {
    const model = mongoose.model(modelName);
    for (const index of indexes) {
      await model.collection.createIndex(index.fields, index.options);
    }
  }
}

// Query optimizer middleware
const optimizeQuery = (options = {}) => {
  return function(next) {
    let query = this;

    // Apply optimizations
    if (options.lean !== false) {
      query = QUERY_OPTIMIZATIONS.lean(query);
    }
    
    if (options.paginate !== false) {
      query = QUERY_OPTIMIZATIONS.paginate(query, options.limit);
    }
    
    if (options.fields) {
      query = QUERY_OPTIMIZATIONS.selectFields(query, options.fields);
    }
    
    if (options.coverIndex !== false) {
      query = QUERY_OPTIMIZATIONS.coverIndex(query, this.model);
    }

    return next.call(query);
  };
};

// Monitor slow queries
mongoose.set('debug', (collection, method, query, doc) => {
  const start = Date.now();
  const logSlowQuery = () => {
    const duration = Date.now() - start;
    if (duration > 100) { // Log queries taking more than 100ms
      console.warn(`Slow query detected: ${collection}.${method}`, {
        query,
        duration,
        timestamp: new Date()
      });
    }
  };
  
  process.nextTick(logSlowQuery);
});

module.exports = {
  setupIndexes,
  optimizeQuery,
  INDEXES,
  QUERY_OPTIMIZATIONS
};

// Minimal crypto polyfill for browser environment
const cryptoPolyfill = {
  randomBytes: (size) => {
    const array = new Uint8Array(size);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(array);
    }
    return array;
  },
  
  createHash: (algorithm) => {
    // Simple hash implementation for browser
    return {
      update: (data) => {
        return {
          digest: () => {
            // Use SubtleCrypto API when available
            if (window.crypto && window.crypto.subtle) {
              return window.crypto.subtle.digest(algorithm, new TextEncoder().encode(data));
            }
            // Fallback to simple hashing
            return Promise.resolve(btoa(data));
          }
        };
      }
    };
  }
};

// Export individual functions for direct usage
export const { randomBytes, createHash } = cryptoPolyfill;

// Export default for backwards compatibility
export default cryptoPolyfill;

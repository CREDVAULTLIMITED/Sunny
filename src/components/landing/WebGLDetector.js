/**
 * WebGL detector module
 * Checks if WebGL is available in the current browser
 */

// Create a detector object to export
const WebGLDetector = {
  /**
   * Check if WebGL is supported in the current browser
   * @returns {boolean} True if WebGL is supported, false otherwise
   */
  isWebGLAvailable: function() {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  },

  /**
   * Check if WebGL2 is supported in the current browser
   * @returns {boolean} True if WebGL2 is supported, false otherwise
   */
  isWebGL2Available: function() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
    } catch (e) {
      return false;
    }
  },

  /**
   * Get a WebGL error message if WebGL is not supported
   * @returns {string} Error message
   */
  getWebGLErrorMessage: function() {
    return 'Your browser does not support WebGL, which is required to display 3D content. Please try using a different browser or updating your current one.';
  }
};

// Export the detector object
export default WebGLDetector;
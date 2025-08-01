import { useEffect } from 'react';

const AppleSignInScript = () => {
  useEffect(() => {
    // Add Apple Sign In script if not already loaded
    if (!document.getElementById('apple-signin-script')) {
      const script = document.createElement('script');
      script.id = 'apple-signin-script';
      script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

export default AppleSignInScript;

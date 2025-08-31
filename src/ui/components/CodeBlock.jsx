import React from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';

const CodeBlock = ({ code, language }) => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <pre className={`language-${language}`}>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.oneOf(['curl', 'node', 'python', 'json']).isRequired
};

export default CodeBlock;

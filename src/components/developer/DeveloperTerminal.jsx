import React, { useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

const DeveloperTerminal = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [terminal, setTerminal] = useState(null);

  React.useEffect(() => {
    if (terminal) return; // Prevent multiple initializations
    
    // Initialize terminal
    const term = new Terminal({
      theme: {
        background: '#1a1b26',
        foreground: '#a9b1d6',
        cursor: '#c0caf5',
        selection: '#33467C',
      },
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);

    term.open(document.getElementById('terminal'));
    fitAddon.fit();
    setTerminal(term);

    term.writeln('Welcome to Sunny Developer Terminal');
    term.writeln('Type "help" for a list of available commands');
    term.writeln('');
    
    term.onKey(({ key, domEvent }) => {
      // Handle terminal input
      if (domEvent.keyCode === 13) { // Enter key
        term.writeln('');
        term.write('$ ');
      } else {
        term.write(key);
      }
    });

    setTerminal(term);

    return () => {
      term.dispose();
    };
  }, []);

  return (
    <div className={`developer-terminal ${isExpanded ? 'expanded' : ''}`}>
      <div className="terminal-header">
        <div className="terminal-title">Developer Terminal</div>
        <div className="terminal-actions">
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Minimize' : 'Expand'}
          </button>
        </div>
      </div>
      <div id="terminal" className="terminal-container" />
    </div>
  );
};

export default DeveloperTerminal;

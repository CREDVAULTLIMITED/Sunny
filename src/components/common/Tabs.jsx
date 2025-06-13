import React, { useState } from 'react';
import './Tabs.css';

export const TabList = ({ children }) => {
  return <div className="tab-list">{children}</div>;
};

export const Tab = ({ children, isActive, onClick }) => {
  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TabPanel = ({ children, isActive }) => {
  if (!isActive) return null;
  return <div className="tab-panel">{children}</div>;
};

export const Tabs = ({ children, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Separate children into TabList and TabPanels
  const tabList = React.Children.toArray(children).find(
    child => child.type === TabList
  );
  const tabPanels = React.Children.toArray(children).filter(
    child => child.type === TabPanel
  );

  // Get tabs from TabList
  const tabs = React.Children.toArray(tabList.props.children);

  return (
    <div className="tabs">
      <TabList>
        {tabs.map((tab, index) =>
          React.cloneElement(tab, {
            key: index,
            isActive: index === activeTab,
            onClick: () => setActiveTab(index)
          })
        )}
      </TabList>
      {tabPanels.map((panel, index) =>
        React.cloneElement(panel, {
          key: index,
          isActive: index === activeTab
        })
      )}
    </div>
  );
};

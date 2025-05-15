import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Button from './Button';
import '../styles/components/FraudDetectionSettings.css';

/**
 * FraudDetectionSettings component for Sunny Payment Gateway
 * 
 * A component for configuring advanced fraud detection settings
 */
const FraudDetectionSettings = ({
  merchantId,
  apiKey,
  className = '',
  onSave,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    ruleBasedSettings: {
      enabled: true,
      thresholds: {
        transactionAmount: 1000,
        velocityCount: 5,
        velocityTimeWindowMinutes: 60
      },
      blockHighRiskCountries: false,
      highRiskCountries: []
    },
    behavioralSettings: {
      enabled: true,
      collectBiometricData: true,
      sensitivityLevel: 'medium',
      deviceFingerprinting: true
    },
    networkAnalysisSettings: {
      enabled: true,
      fraudRingDetection: true,
      crossMerchantAnalysis: false,
      sharedIdentifierTracking: true
    },
    mlSettings: {
      enabled: true,
      autoUpdateModels: true,
      feedbackLoopEnabled: true,
      riskScoreThreshold: 80
    }
  });
  
  // Fetch current settings
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, this would fetch from an API
        // For this example, we'll use mock data and a delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data is already set in the initial state
        // In a real implementation, we would update the state with the fetched data
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load fraud detection settings');
        console.error('Settings error:', err);
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, [merchantId, apiKey]);
  
  // Handle settings change
  const handleSettingChange = (section, field, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [section]: {
        ...prevSettings[section],
        [field]: value
      }
    }));
  };
  
  // Handle threshold change
  const handleThresholdChange = (threshold, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ruleBasedSettings: {
        ...prevSettings.ruleBasedSettings,
        thresholds: {
          ...prevSettings.ruleBasedSettings.thresholds,
          [threshold]: value
        }
      }
    }));
  };
  
  // Handle save
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    
    try {
      // In a real implementation, this would send to an API
      // For this example, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSave) {
        onSave(settings);
      }
      
      setSaving(false);
    } catch (err) {
      setError('Failed to save fraud detection settings');
      console.error('Save error:', err);
      setSaving(false);
    }
  };
  
  const baseClass = 'sunny-fraud-settings';
  const classes = [baseClass, className].filter(Boolean).join(' ');
  
  if (loading) {
    return (
      <div className={`${classes} ${baseClass}--loading`}>
        <div className={`${baseClass}__loader`}>
          <div className={`${baseClass}__loader-spinner`}></div>
          <div className={`${baseClass}__loader-text`}>Loading fraud detection settings...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={classes} {...props}>
      <div className={`${baseClass}__header`}>
        <h1 className={`${baseClass}__title`}>Fraud Detection Settings</h1>
        <p className={`${baseClass}__description`}>
          Configure your fraud detection settings to protect your business from fraudulent transactions.
        </p>
      </div>
      
      <div className={`${baseClass}__sections`}>
        {/* Rule-Based Detection */}
        <Card className={`${baseClass}__section`}>
          <div className={`${baseClass}__section-header`}>
            <h2 className={`${baseClass}__section-title`}>Rule-Based Detection</h2>
            <div className={`${baseClass}__section-toggle`}>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.ruleBasedSettings.enabled}
                  onChange={(e) => handleSettingChange('ruleBasedSettings', 'enabled', e.target.checked)}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
          </div>
          
          <div className={`${baseClass}__section-content`}>
            <div className={`${baseClass}__setting-group`}>
              <h3 className={`${baseClass}__setting-group-title`}>Transaction Thresholds</h3>
              
              <div className={`${baseClass}__setting`}>
                <label className={`${baseClass}__setting-label`}>
                  High Amount Threshold ($)
                </label>
                <input
                  type="number"
                  className={`${baseClass}__setting-input`}
                  value={settings.ruleBasedSettings.thresholds.transactionAmount}
                  onChange={(e) => handleThresholdChange('transactionAmount', parseInt(e.target.value, 10))}
                  disabled={!settings.ruleBasedSettings.enabled}
                />
              </div>
              
              <div className={`${baseClass}__setting`}>
                <label className={`${baseClass}__setting-label`}>
                  Velocity Check Count
                </label>
                <input
                  type="number"
                  className={`${baseClass}__setting-input`}
                  value={settings.ruleBasedSettings.thresholds.velocityCount}
                  onChange={(e) => handleThresholdChange('velocityCount', parseInt(e.target.value, 10))}
                  disabled={!settings.ruleBasedSettings.enabled}
                />
              </div>
              
              <div className={`${baseClass}__setting`}>
                <label className={`${baseClass}__setting-label`}>
                  Velocity Time Window (minutes)
                </label>
                <input
                  type="number"
                  className={`${baseClass}__setting-input`}
                  value={settings.ruleBasedSettings.thresholds.velocityTimeWindowMinutes}
                  onChange={(e) => handleThresholdChange('velocityTimeWindowMinutes', parseInt(e.target.value, 10))}
                  disabled={!settings.ruleBasedSettings.enabled}
                />
              </div>
            </div>
            
            <div className={`${baseClass}__setting-group`}>
              <h3 className={`${baseClass}__setting-group-title`}>Country Risk Settings</h3>
              
              <div className={`${baseClass}__setting`}>
                <label className={`${baseClass}__setting-label`}>
                  Block High-Risk Countries
                </label>
                <label className={`${baseClass}__toggle`}>
                  <input
                    type="checkbox"
                    checked={settings.ruleBasedSettings.blockHighRiskCountries}
                    onChange={(e) => handleSettingChange('ruleBasedSettings', 'blockHighRiskCountries', e.target.checked)}
                    disabled={!settings.ruleBasedSettings.enabled}
                  />
                  <span className={`${baseClass}__toggle-slider`}></span>
                </label>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Behavioral Biometrics */}
        <Card className={`${baseClass}__section`}>
          <div className={`${baseClass}__section-header`}>
            <h2 className={`${baseClass}__section-title`}>Behavioral Biometrics</h2>
            <div className={`${baseClass}__section-toggle`}>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.behavioralSettings.enabled}
                  onChange={(e) => handleSettingChange('behavioralSettings', 'enabled', e.target.checked)}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
          </div>
          
          <div className={`${baseClass}__section-content`}>
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>
                Collect Biometric Data
              </label>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.behavioralSettings.collectBiometricData}
                  onChange={(e) => handleSettingChange('behavioralSettings', 'collectBiometricData', e.target.checked)}
                  disabled={!settings.behavioralSettings.enabled}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>
                Device Fingerprinting
              </label>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.behavioralSettings.deviceFingerprinting}
                  onChange={(e) => handleSettingChange('behavioralSettings', 'deviceFingerprinting', e.target.checked)}
                  disabled={!settings.behavioralSettings.enabled}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>
                Sensitivity Level
              </label>
              <select
                className={`${baseClass}__setting-select`}
                value={settings.behavioralSettings.sensitivityLevel}
                onChange={(e) => handleSettingChange('behavioralSettings', 'sensitivityLevel', e.target.value)}
                disabled={!settings.behavioralSettings.enabled}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </Card>
        
        {/* Network Analysis */}
        <Card className={`${baseClass}__section`}>
          <div className={`${baseClass}__section-header`}>
            <h2 className={`${baseClass}__section-title`}>Network Analysis</h2>
            <div className={`${baseClass}__section-toggle`}>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.networkAnalysisSettings.enabled}
                  onChange={(e) => handleSettingChange('networkAnalysisSettings', 'enabled', e.target.checked)}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
          </div>
          
          <div className={`${baseClass}__section-content`}>
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>
                Fraud Ring Detection
              </label>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.networkAnalysisSettings.fraudRingDetection}
                  onChange={(e) => handleSettingChange('networkAnalysisSettings', 'fraudRingDetection', e.target.checked)}
                  disabled={!settings.networkAnalysisSettings.enabled}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>
                Cross-Merchant Analysis
              </label>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.networkAnalysisSettings.crossMerchantAnalysis}
                  onChange={(e) => handleSettingChange('networkAnalysisSettings', 'crossMerchantAnalysis', e.target.checked)}
                  disabled={!settings.networkAnalysisSettings.enabled}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>
                Shared Identifier Tracking
              </label>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.networkAnalysisSettings.sharedIdentifierTracking}
                  onChange={(e) => handleSettingChange('networkAnalysisSettings', 'sharedIdentifierTracking', e.target.checked)}
                  disabled={!settings.networkAnalysisSettings.enabled}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
          </div>
        </Card>
        
        {/* Machine Learning */}
        <Card className={`${baseClass}__section`}>
          <div className={`${baseClass}__section-header`}>
            <h2 className={`${baseClass}__section-title`}>Machine Learning</h2>
            <div className={`${baseClass}__section-toggle`}>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.mlSettings.enabled}
                  onChange={(e) => handleSettingChange('mlSettings', 'enabled', e.target.checked)}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
          </div>
          
          <div className={`${baseClass}__section-content`}>
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>
                Auto-Update Models
              </label>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.mlSettings.autoUpdateModels}
                  onChange={(e) => handleSettingChange('mlSettings', 'autoUpdateModels', e.target.checked)}
                  disabled={!settings.mlSettings.enabled}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>
                Feedback Loop
              </label>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.mlSettings.feedbackLoopEnabled}
                  onChange={(e) => handleSettingChange('mlSettings', 'feedbackLoopEnabled', e.target.checked)}
                  disabled={!settings.mlSettings.enabled}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>
                Risk Score Threshold
              </label>
              <div className={`${baseClass}__range-container`}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className={`${baseClass}__setting-range`}
                  value={settings.mlSettings.riskScoreThreshold}
                  onChange={(e) => handleSettingChange('mlSettings', 'riskScoreThreshold', parseInt(e.target.value, 10))}
                  disabled={!settings.mlSettings.enabled}
                />
                <span className={`${baseClass}__range-value`}>{settings.mlSettings.riskScoreThreshold}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className={`${baseClass}__actions`}>
        {error && (
          <div className={`${baseClass}__error`}>
            {error}
          </div>
        )}
        
        <Button
          variant="primary"
          onClick={handleSave}
          loading={saving}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

FraudDetectionSettings.propTypes = {
  merchantId: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  className: PropTypes.string,
  onSave: PropTypes.func,
};

export default FraudDetectionSettings;
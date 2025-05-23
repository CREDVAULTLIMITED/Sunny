                          <div key={errorIndex} className="error-message">
                            <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="preview-actions">
          <button 
            className="primary-button" 
            onClick={processPayments}
            disabled={isProcessing || validationResults.errors > 0}
          >
            Process Payments
          </button>
          <button 
            className="secondary-button" 
            onClick={resetForm}
            disabled={isProcessing}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <div className="bulk-payment-processor">
        <div className="processor-header">
          <h2>Bulk Payment Processor</h2>
          <p className="description">
            Upload a CSV or Excel file containing payment details to process multiple payments at once.
          </p>
        </div>
        
        {uploadError && (
          <div className="error-alert">
            <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{uploadError}</span>
            <button className="close-button" onClick={() => setUploadError(null)}>×</button>
          </div>
        )}
        
        {!previewData && !isUploading && renderUploadArea()}
        
        {isUploading && (
          <div className="upload-progress">
            <h3>Uploading and Processing File</h3>
            {renderProgressBar(uploadProgress, 'Upload Progress')}
          </div>
        )}
        
        {renderDataPreview()}
        {renderProcessingStatus()}
        {renderResultsSummary()}
      </div>
    </ErrorBoundary>
  );
};

export default BulkPaymentProcessor;

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSunny } from '../../sdk/SunnyReactSDK.js';
import ErrorBoundary from '../common/ErrorBoundary.jsx';
import './BulkPaymentProcessor.css';

// Mock data for previewing the component without actual file upload
const SAMPLE_DATA = {
  headers: ['Recipient', 'Email', 'Amount', 'Currency', 'Description', 'Reference'],
  rows: [
    { id: 1, data: ['John Smith', 'john@example.com', '500.00', 'USD', 'May Invoice', 'INV-123'], status: 'valid', errors: [] },
    { id: 2, data: ['Jane Doe', 'jane@example.com', '750.50', 'EUR', 'Consulting Fee', 'CONS-456'], status: 'valid', errors: [] },
    { id: 3, data: ['Acme Corp', '', '1200.00', 'GBP', 'Services', 'SVC-789'], status: 'warning', errors: ['Email is required'] },
    { id: 4, data: ['Tech Systems', 'info@techsystems.com', '-50.00', 'USD', 'Refund', 'REF-101'], status: 'error', errors: ['Amount must be positive'] }
  ]
};

// Supported file types
const FILE_TYPES = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

const BulkPaymentProcessor = () => {
  const { sdk } = useSunny();
  const fileInputRef = useRef(null);
  
  // State for file upload and processing
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  
  // State for data preview and validation
  const [previewData, setPreviewData] = useState(null);
  const [validationResults, setValidationResults] = useState({ valid: 0, warnings: 0, errors: 0 });
  
  // State for processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState(null);
  const [processError, setProcessError] = useState(null);
  const [processProgress, setProcessProgress] = useState(0);
  const [jobId, setJobId] = useState(null);
  
  // Reference for interval timer
  const statusCheckIntervalRef = useRef(null);

  // Handle drag and drop events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length) {
      handleFiles(e.target.files);
    }
  };

  // Process the selected files
  const handleFiles = (files) => {
    const selectedFile = files[0];
    
    // Validate file type
    if (!FILE_TYPES.includes(selectedFile.type)) {
      setUploadError('Invalid file type. Please upload a CSV or Excel file.');
      return;
    }
    
    setFile(selectedFile);
    setUploadError(null);
    parseFile(selectedFile);
  };

  // Parse the file to preview data
  const parseFile = async (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      // In a real implementation, we'd use a library like Papa Parse for CSV
      // or SheetJS (xlsx) for Excel files
      
      // For demo purposes, we'll use the sample data
      // In production, this would be replaced with actual file parsing
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        // Process the parsed data
        const parsedData = SAMPLE_DATA; // Replace with actual parsed data
        setPreviewData(parsedData);
        validateData(parsedData);
        
        setTimeout(() => {
          setIsUploading(false);
        }, 500);
      }, 2000);
      
    } catch (error) {
      console.error('Error parsing file:', error);
      setUploadError(`Failed to parse file: ${error.message}`);
      setIsUploading(false);
    }
  };

  // Validate the parsed data
  const validateData = (data) => {
    // Count validation statuses
    const validCount = data.rows.filter(row => row.status === 'valid').length;
    const warningCount = data.rows.filter(row => row.status === 'warning').length;
    const errorCount = data.rows.filter(row => row.status === 'error').length;
    
    setValidationResults({
      valid: validCount,
      warnings: warningCount,
      errors: errorCount
    });
  };

  // Process payments
  const processPayments = async () => {
    if (!previewData || validationResults.errors > 0) return;
    
    setIsProcessing(true);
    setProcessError(null);
    setProcessProgress(0);
    
    try {
      // Simulate starting a bulk payment job
      const response = await simulateStartJob();
      
      setJobId(response.jobId);
      
      // Start checking status
      startStatusChecks(response.jobId);
    } catch (error) {
      console.error('Error processing bulk payments:', error);
      setProcessError(`Failed to process payments: ${error.message}`);
      setIsProcessing(false);
    }
  };

  // Simulate starting a bulk payment job
  const simulateStartJob = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          jobId: 'job-' + Math.random().toString(36).substr(2, 9),
          status: 'queued'
        });
      }, 1000);
    });
  };

  // Start checking the job status
  const startStatusChecks = (jobId) => {
    // Clear any existing interval
    if (statusCheckIntervalRef.current) {
      clearInterval(statusCheckIntervalRef.current);
    }
    
    // Set initial status
    setProcessingStatus('queued');
    
    // Check status every 2 seconds
    statusCheckIntervalRef.current = setInterval(() => {
      checkJobStatus(jobId);
    }, 2000);
  };

  // Check the status of a job
  const checkJobStatus = async (jobId) => {
    try {
      // In production, this would call the SDK
      // const status = await sdk.getBulkPaymentStatus(jobId);
      
      // Simulate getting status
      const status = simulateJobStatus(processingStatus);
      
      setProcessingStatus(status.status);
      setProcessProgress(status.progress);
      
      // If job is complete or failed, stop checking
      if (status.status === 'completed' || status.status === 'failed') {
        clearInterval(statusCheckIntervalRef.current);
        setIsProcessing(status.status !== 'failed');
        
        if (status.status === 'failed') {
          setProcessError(status.error || 'Job failed with no specific error message');
        }
      }
    } catch (error) {
      console.error('Error checking job status:', error);
      clearInterval(statusCheckIntervalRef.current);
      setProcessError(`Failed to check job status: ${error.message}`);
      setIsProcessing(false);
    }
  };

  // Simulate job status changes
  const simulateJobStatus = (currentStatus) => {
    const statuses = {
      'queued': { nextStatus: 'processing', progress: 0 },
      'processing': { nextStatus: 'validating', progress: 30 },
      'validating': { nextStatus: 'executing', progress: 60 },
      'executing': { nextStatus: 'completed', progress: 90 },
      'completed': { nextStatus: 'completed', progress: 100 }
    };
    
    const current = statuses[currentStatus] || statuses['queued'];
    
    return {
      status: current.nextStatus,
      progress: current.progress
    };
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (statusCheckIntervalRef.current) {
        clearInterval(statusCheckIntervalRef.current);
      }
    };
  }, []);

  // Reset the form
  const resetForm = () => {
    setFile(null);
    setPreviewData(null);
    setUploadProgress(0);
    setUploadError(null);
    setValidationResults({ valid: 0, warnings: 0, errors: 0 });
    setIsProcessing(false);
    setProcessingStatus(null);
    setProcessProgress(0);
    setProcessError(null);
    setJobId(null);
    
    if (statusCheckIntervalRef.current) {
      clearInterval(statusCheckIntervalRef.current);
    }
  };

  // Generate a downloadable template
  const downloadTemplate = () => {
    // In a real app, generate and download a template CSV/Excel file
    alert('Template download would start here');
  };

  // Render the upload area
  const renderUploadArea = () => (
    <div 
      className={`upload-area ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="upload-content">
        <div className="upload-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <h3>Drag & Drop Your File Here</h3>
        <p>or</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          accept=".csv,.xls,.xlsx"
        />
        <button 
          className="upload-button"
          onClick={() => fileInputRef.current.click()}
        >
          Select File
        </button>
        <p className="upload-info">
          Supported formats: CSV, Excel (.xls, .xlsx)
        </p>
        <div className="template-link">
          <button onClick={downloadTemplate} className="text-button">
            Download template file
          </button>
        </div>
      </div>
    </div>
  );

  // Render the progress bar
  const renderProgressBar = (progress, label) => (
    <div className="progress-container">
      <div className="progress-label">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );

  // Render the processing status
  const renderProcessingStatus = () => {
    if (!isProcessing && !processingStatus) return null;
    
    return (
      <div className="processing-status">
        <h3>Processing Status: {processingStatus}</h3>
        {renderProgressBar(processProgress, 'Processing Progress')}
        
        <div className="status-steps">
          <div className={`status-step ${processingStatus === 'queued' || processingStatus === 'processing' || processingStatus === 'validating' || processingStatus === 'executing' || processingStatus === 'completed' ? 'active' : ''}`}>
            <div className="step-indicator">1</div>
            <div className="step-label">Queued</div>
          </div>
          <div className="step-connector"></div>
          <div className={`status-step ${processingStatus === 'processing' || processingStatus === 'validating' || processingStatus === 'executing' || processingStatus === 'completed' ? 'active' : ''}`}>
            <div className="step-indicator">2</div>
            <div className="step-label">Processing</div>
          </div>
          <div className="step-connector"></div>
          <div className={`status-step ${processingStatus === 'validating' || processingStatus === 'executing' || processingStatus === 'completed' ? 'active' : ''}`}>
            <div className="step-indicator">3</div>
            <div className="step-label">Validating</div>
          </div>
          <div className="step-connector"></div>
          <div className={`status-step ${processingStatus === 'executing' || processingStatus === 'completed' ? 'active' : ''}`}>
            <div className="step-indicator">4</div>
            <div className="step-label">Executing</div>
          </div>
          <div className="step-connector"></div>
          <div className={`status-step ${processingStatus === 'completed' ? 'active' : ''}`}>
            <div className="step-indicator">5</div>
                        {row.errors.length > 0 && (
                      <div className="error-messages">
                        {row.errors.map((error, errorIndex) => (
                          <div key={errorIndex} className="error-message">
                            <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                          </div>
                        ))}
                      </div>
                    )}
<span className="id-value">{jobId}</span>
          </div>
        )}
        
        {processError && (
          <div className="process-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{processError}</span>
          </div>
        )}
      </div>
    );
  };
  
  // Render results summary
  const renderResultsSummary = () => {
    if (!processingStatus || processingStatus !== 'completed') return null;
    
    return (
      <div className="results-summary">
        <div className="summary-header">
          <h3>Payment Processing Complete</h3>
          <div className="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="summary-stats">
          <div className="summary-stat">
            <span className="stat-label">Total Payments</span>
            <span className="stat-value">{validationResults.valid + validationResults.warnings}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Successful</span>
            <span className="stat-value">{validationResults.valid}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">With Warnings</span>
            <span className="stat-value">{validationResults.warnings}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Failed</span>
            <span className="stat-value">0</span>
          </div>
        </div>
        
        <div className="summary-actions">
          <button onClick={resetForm} className="primary-button">
            Process Another Batch
          </button>
          <button className="secondary-button">
            Download Report
          </button>
        </div>
      </div>
    );
  };

  // Render the data preview
  const renderDataPreview = () => {
    if (!previewData) return null;
    
    return (
      <div className="data-preview">
        <h3>Data Preview</h3>
        
        <div className="validation-summary">
          <div className="validation-item valid">
            <span className="validation-count">{validationResults.valid}</span>
            <span className="validation-label">Valid</span>
          </div>
          <div className="validation-item warning">
            <span className="validation-count">{validationResults.warnings}</span>
            <span className="validation-label">Warnings</span>
          </div>
          <div className="validation-item error">
            <span className="validation-count">{validationResults.errors}</span>
            <span className="validation-label">Errors</span>
          </div>
        </div>
        
        <div className="preview-table-container">
          <table className="preview-table">
            <thead>
              <tr>
                <th>Row</th>
                {previewData.headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {previewData.rows.map((row) => (
                <tr key={row.id} className={row.status}>
                  <td>{row.id}</td>
                  {row.data.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                  <td>
                    <div className="status-cell">
                      <span className={`status-indicator ${row.status}`}></span>
                      <span className="status-text">
                        {row.status === 'valid' ? 'Valid' : 
                         row.status === 'warning' ? 'Warning' : 'Error'}
                      </span>
                    </div>
                    {row.errors.length > 0 && (
                      <div className="error-messages">
                        {row.errors.map((error, errorIndex) => (


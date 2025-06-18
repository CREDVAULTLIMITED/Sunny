//! Behavioral biometrics for fraud detection
//!
//! This module provides behavioral biometrics analysis to detect
//! unusual patterns in user behavior that may indicate fraud.

use std::collections::HashMap;
use serde::{Deserialize, Serialize};

use crate::error::Result;

/// Behavioral biometrics analyzer
pub struct BehavioralBiometrics {
    // Configuration options
}

impl BehavioralBiometrics {
    /// Create a new behavioral biometrics analyzer
    pub fn new() -> Self {
        Self {}
    }
    
    /// Analyze behavioral data for anomalies
    pub fn analyze(&self, data: &BehavioralData) -> Result<BehavioralAnalysisResult> {
        // In a real implementation, this would analyze the behavioral data
        // to detect anomalies that may indicate fraud
        
        // Calculate anomaly scores for different behaviors
        let typing_anomaly_score = self.analyze_typing_pattern(data);
        let mouse_anomaly_score = self.analyze_mouse_movement(data);
        let navigation_anomaly_score = self.analyze_navigation_pattern(data);
        let form_filling_anomaly_score = self.analyze_form_filling(data);
        
        // Calculate overall anomaly score (weighted average)
        let overall_anomaly_score = (
            typing_anomaly_score * 0.4 +
            mouse_anomaly_score * 0.2 +
            navigation_anomaly_score * 0.2 +
            form_filling_anomaly_score * 0.2
        ) as u8;
        
        // Determine if the behavior is anomalous
        let is_anomalous = overall_anomaly_score > 70;
        
        Ok(BehavioralAnalysisResult {
            is_anomalous,
            anomaly_score: overall_anomaly_score,
            typing_anomaly_score,
            mouse_anomaly_score,
            navigation_anomaly_score,
            form_filling_anomaly_score,
            confidence: self.calculate_confidence(data),
        })
    }
    
    /// Analyze typing pattern for anomalies
    fn analyze_typing_pattern(&self, data: &BehavioralData) -> f32 {
        // In a real implementation, this would analyze typing patterns
        // such as keystroke dynamics, typing speed, and error rates
        
        if let Some(typing) = &data.typing_data {
            // Check if typing speed is significantly different from the user's baseline
            let speed_anomaly = if let (Some(baseline_speed), Some(current_speed)) = 
                (data.user_profile.as_ref().and_then(|p| p.average_typing_speed), typing.typing_speed) {
                (current_speed - baseline_speed).abs() / baseline_speed
            } else {
                0.0
            };
            
            // Check if keystroke rhythm is significantly different from the user's baseline
            let rhythm_anomaly = if let Some(keystroke_intervals) = &typing.keystroke_intervals {
                if keystroke_intervals.is_empty() {
                    0.0
                } else {
                    // Calculate variance of keystroke intervals
                    let mean = keystroke_intervals.iter().sum::<f32>() / keystroke_intervals.len() as f32;
                    let variance = keystroke_intervals.iter()
                        .map(|&x| (x - mean).powi(2))
                        .sum::<f32>() / keystroke_intervals.len() as f32;
                    
                    // Compare with baseline variance
                    if let Some(baseline_variance) = data.user_profile.as_ref()
                        .and_then(|p| p.keystroke_variance) {
                        (variance - baseline_variance).abs() / baseline_variance
                    } else {
                        0.0
                    }
                }
            } else {
                0.0
            };
            
            // Combine anomaly scores
            let combined_anomaly = speed_anomaly * 0.5 + rhythm_anomaly * 0.5;
            
            // Scale to 0-100
            (combined_anomaly * 100.0).min(100.0)
        } else {
            0.0 // No typing data available
        }
    }
    
    /// Analyze mouse movement for anomalies
    fn analyze_mouse_movement(&self, data: &BehavioralData) -> f32 {
        // In a real implementation, this would analyze mouse movement patterns
        // such as speed, acceleration, and path
        
        if let Some(mouse) = &data.mouse_data {
            // Check if mouse movement speed is significantly different from the user's baseline
            let speed_anomaly = if let (Some(baseline_speed), Some(current_speed)) = 
                (data.user_profile.as_ref().and_then(|p| p.average_mouse_speed), mouse.movement_speed) {
                (current_speed - baseline_speed).abs() / baseline_speed
            } else {
                0.0
            };
            
            // Check if mouse movement straightness is significantly different from the user's baseline
            let straightness_anomaly = if let (Some(baseline_straightness), Some(current_straightness)) = 
                (data.user_profile.as_ref().and_then(|p| p.mouse_path_straightness), mouse.path_straightness) {
                (current_straightness - baseline_straightness).abs() / baseline_straightness
            } else {
                0.0
            };
            
            // Combine anomaly scores
            let combined_anomaly = speed_anomaly * 0.5 + straightness_anomaly * 0.5;
            
            // Scale to 0-100
            (combined_anomaly * 100.0).min(100.0)
        } else {
            0.0 // No mouse data available
        }
    }
    
    /// Analyze navigation pattern for anomalies
    fn analyze_navigation_pattern(&self, data: &BehavioralData) -> f32 {
        // In a real implementation, this would analyze navigation patterns
        // such as page visit sequence and time spent on each page
        
        if let Some(navigation) = &data.navigation_data {
            // Check if navigation pattern is significantly different from the user's baseline
            if let (Some(baseline_pages), Some(current_pages)) = 
                (data.user_profile.as_ref().and_then(|p| p.typical_page_sequence.as_ref()), &navigation.page_sequence) {
                
                // Calculate similarity between current and baseline page sequences
                let similarity = self.calculate_sequence_similarity(baseline_pages, current_pages);
                
                // Convert similarity to anomaly score (0-100)
                (1.0 - similarity) * 100.0
            } else {
                0.0
            }
        } else {
            0.0 // No navigation data available
        }
    }
    
    /// Analyze form filling pattern for anomalies
    fn analyze_form_filling(&self, data: &BehavioralData) -> f32 {
        // In a real implementation, this would analyze form filling patterns
        // such as field order, corrections, and time spent on each field
        
        if let Some(form) = &data.form_filling_data {
            // Check if form filling order is significantly different from the user's baseline
            let order_anomaly = if let (Some(baseline_order), Some(current_order)) = 
                (data.user_profile.as_ref().and_then(|p| p.typical_form_field_order.as_ref()), &form.field_order) {
                
                // Calculate similarity between current and baseline field orders
                let similarity = self.calculate_sequence_similarity(baseline_order, current_order);
                
                // Convert similarity to anomaly score (0-100)
                (1.0 - similarity) * 100.0
            } else {
                0.0
            };
            
            // Check if correction rate is significantly different from the user's baseline
            let correction_anomaly = if let (Some(baseline_rate), Some(current_rate)) = 
                (data.user_profile.as_ref().and_then(|p| p.form_correction_rate), form.correction_rate) {
                
                // Calculate relative difference
                (current_rate - baseline_rate).abs() / baseline_rate * 100.0
            } else {
                0.0
            };
            
            // Combine anomaly scores
            (order_anomaly * 0.6 + correction_anomaly * 0.4).min(100.0)
        } else {
            0.0 // No form filling data available
        }
    }
    
    /// Calculate confidence in the analysis based on data quality and quantity
    fn calculate_confidence(&self, data: &BehavioralData) -> u8 {
        // Calculate confidence based on data completeness and quality
        let mut confidence = 0.0;
        let mut factors = 0;
        
        // Check typing data
        if let Some(typing) = &data.typing_data {
            confidence += if typing.keystroke_intervals.is_some() { 1.0 } else { 0.5 };
            factors += 1;
        }
        
        // Check mouse data
        if let Some(mouse) = &data.mouse_data {
            confidence += if mouse.movement_path.is_some() { 1.0 } else { 0.5 };
            factors += 1;
        }
        
        // Check navigation data
        if let Some(navigation) = &data.navigation_data {
            confidence += if !navigation.page_sequence.is_empty() { 1.0 } else { 0.5 };
            factors += 1;
        }
        
        // Check form filling data
        if let Some(form) = &data.form_filling_data {
            confidence += if !form.field_order.is_empty() { 1.0 } else { 0.5 };
            factors += 1;
        }
        
        // Check if user profile is available
        if data.user_profile.is_some() {
            confidence += 1.0;
            factors += 1;
        }
        
        // Calculate average confidence
        if factors > 0 {
            (confidence / factors as f32 * 100.0) as u8
        } else {
            0
        }
    }
    
    /// Calculate similarity between two sequences
    fn calculate_sequence_similarity<T: PartialEq>(&self, seq1: &[T], seq2: &[T]) -> f32 {
        if seq1.is_empty() || seq2.is_empty() {
            return 0.0;
        }
        
        // Calculate longest common subsequence length
        let lcs_length = self.longest_common_subsequence_length(seq1, seq2);
        
        // Calculate similarity as ratio of LCS length to average sequence length
        let avg_length = (seq1.len() + seq2.len()) as f32 / 2.0;
        lcs_length as f32 / avg_length
    }
    
    /// Calculate length of longest common subsequence between two sequences
    fn longest_common_subsequence_length<T: PartialEq>(&self, seq1: &[T], seq2: &[T]) -> usize {
        let m = seq1.len();
        let n = seq2.len();
        
        // Create DP table
        let mut dp = vec![vec![0; n + 1]; m + 1];
        
        // Fill DP table
        for i in 1..=m {
            for j in 1..=n {
                if seq1[i - 1] == seq2[j - 1] {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = dp[i - 1][j].max(dp[i][j - 1]);
                }
            }
        }
        
        dp[m][n]
    }
}

/// Behavioral data collected from the user
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BehavioralData {
    /// Typing-related behavioral data
    pub typing_data: Option<TypingData>,
    
    /// Mouse movement behavioral data
    pub mouse_data: Option<MouseData>,
    
    /// Navigation pattern data
    pub navigation_data: Option<NavigationData>,
    
    /// Form filling pattern data
    pub form_filling_data: Option<FormFillingData>,
    
    /// User's behavioral profile (if available)
    pub user_profile: Option<UserBehavioralProfile>,
    
    /// Device information
    pub device_info: Option<DeviceInfo>,
    
    /// Session information
    pub session_info: Option<SessionInfo>,
}

/// Typing-related behavioral data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TypingData {
    /// Average typing speed in characters per minute
    pub typing_speed: Option<f32>,
    
    /// Time intervals between keystrokes in milliseconds
    pub keystroke_intervals: Option<Vec<f32>>,
    
    /// Error and correction rate
    pub error_rate: Option<f32>,
    
    /// Typical key hold times in milliseconds
    pub key_hold_times: Option<HashMap<String, f32>>,
}

/// Mouse movement behavioral data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MouseData {
    /// Average mouse movement speed in pixels per second
    pub movement_speed: Option<f32>,
    
    /// Mouse movement path as a series of (x, y) coordinates
    pub movement_path: Option<Vec<(f32, f32)>>,
    
    /// Straightness of mouse path (1.0 = perfectly straight, 0.0 = very curved)
    pub path_straightness: Option<f32>,
    
    /// Click precision (distance from target center)
    pub click_precision: Option<f32>,
}

/// Navigation pattern data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NavigationData {
    /// Sequence of pages visited
    pub page_sequence: Vec<String>,
    
    /// Time spent on each page in seconds
    pub page_times: HashMap<String, f32>,
    
    /// Number of visits to each page
    pub page_visits: HashMap<String, u32>,
}

/// Form filling pattern data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FormFillingData {
    /// Order in which form fields were filled
    pub field_order: Vec<String>,
    
    /// Time spent on each field in seconds
    pub field_times: HashMap<String, f32>,
    
    /// Number of corrections made in each field
    pub field_corrections: HashMap<String, u32>,
    
    /// Overall correction rate (corrections / total fields)
    pub correction_rate: Option<f32>,
}

/// User's behavioral profile
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserBehavioralProfile {
    /// Average typing speed in characters per minute
    pub average_typing_speed: Option<f32>,
    
    /// Variance in keystroke timing
    pub keystroke_variance: Option<f32>,
    
    /// Average mouse movement speed in pixels per second
    pub average_mouse_speed: Option<f32>,
    
    /// Typical mouse path straightness
    pub mouse_path_straightness: Option<f32>,
    
    /// Typical sequence of pages visited
    pub typical_page_sequence: Option<Vec<String>>,
    
    /// Typical order of filling form fields
    pub typical_form_field_order: Option<Vec<String>>,
    
    /// Typical form correction rate
    pub form_correction_rate: Option<f32>,
}

/// Device information
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DeviceInfo {
    /// Device type (desktop, mobile, tablet)
    pub device_type: String,
    
    /// Operating system
    pub os: String,
    
    /// Browser
    pub browser: String,
    
    /// Screen resolution
    pub screen_resolution: (u32, u32),
    
    /// Device orientation (portrait, landscape)
    pub orientation: Option<String>,
    
    /// Touch capability
    pub touch_capable: bool,
}

/// Session information
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SessionInfo {
    /// Session ID
    pub session_id: String,
    
    /// Session start time
    pub start_time: String,
    
    /// Session duration in seconds
    pub duration: Option<u32>,
    
    /// IP address
    pub ip_address: Option<String>,
    
    /// Geolocation
    pub geolocation: Option<GeoLocation>,
}

/// Geolocation information
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GeoLocation {
    /// Country code
    pub country: String,
    
    /// City
    pub city: Option<String>,
    
    /// Latitude
    pub latitude: Option<f32>,
    
    /// Longitude
    pub longitude: Option<f32>,
}

/// Result of behavioral analysis
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BehavioralAnalysisResult {
    /// Whether the behavior is anomalous
    pub is_anomalous: bool,
    
    /// Overall anomaly score (0-100)
    pub anomaly_score: u8,
    
    /// Typing anomaly score (0-100)
    pub typing_anomaly_score: f32,
    
    /// Mouse movement anomaly score (0-100)
    pub mouse_anomaly_score: f32,
    
    /// Navigation pattern anomaly score (0-100)
    pub navigation_anomaly_score: f32,
    
    /// Form filling anomaly score (0-100)
    pub form_filling_anomaly_score: f32,
    
    /// Confidence in the analysis (0-100)
    pub confidence: u8,
}
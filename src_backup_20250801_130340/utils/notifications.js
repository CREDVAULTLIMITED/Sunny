import axios from 'axios';
import nodemailer from 'nodemailer';
import logger from '../services/loggingService';

// Configure email transport
const emailTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * Send an email notification
 */
export async function sendEmailAlert(to, subject, body) {
  try {
    await emailTransport.sendMail({
      from: process.env.ALERT_FROM_EMAIL,
      to,
      subject,
      text: body,
      html: `<pre>${body}</pre>`
    });
    logger.info('Email alert sent successfully', { to, subject });
  } catch (error) {
    logger.error('Failed to send email alert', { error: error.message, to, subject });
    throw error;
  }
}

/**
 * Send an SMS notification
 */
export async function sendSMSAlert(to, message) {
  try {
    // Support multiple SMS providers
    const provider = process.env.SMS_PROVIDER?.toLowerCase() || 'twilio';

    switch (provider) {
      case 'twilio':
        await axios.post(
          `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
          new URLSearchParams({
            To: to,
            From: process.env.TWILIO_FROM_NUMBER,
            Body: message
          }),
          {
            auth: {
              username: process.env.TWILIO_ACCOUNT_SID,
              password: process.env.TWILIO_AUTH_TOKEN
            }
          }
        );
        break;

      default:
        throw new Error(`Unsupported SMS provider: ${provider}`);
    }
    logger.info('SMS alert sent successfully', { to });
  } catch (error) {
    logger.error('Failed to send SMS alert', { error: error.message, to });
    throw error;
  }
}

/**
 * Send a Slack notification
 */
export async function sendSlackAlert(channel, message) {
  try {
    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      channel,
      text: message,
      username: 'Sunny Payments Monitor',
      icon_emoji: ':warning:'
    });
    logger.info('Slack alert sent successfully', { channel });
  } catch (error) {
    logger.error('Failed to send Slack alert', { error: error.message, channel });
    throw error;
  }
}

/**
 * Send a PagerDuty incident
 */
export async function createPagerDutyIncident(title, details, severity = 'error') {
  try {
    await axios.post('https://events.pagerduty.com/v2/enqueue', {
      routing_key: process.env.PAGERDUTY_INTEGRATION_KEY,
      event_action: 'trigger',
      payload: {
        summary: title,
        source: 'Sunny Payments Monitor',
        severity,
        custom_details: details
      }
    });
    logger.info('PagerDuty incident created successfully', { title, severity });
  } catch (error) {
    logger.error('Failed to create PagerDuty incident', { error: error.message, title });
    throw error;
  }
}

/**
 * Parse alert endpoint configuration to extract endpoint details
 */
export function parseAlertEndpoint(endpoint) {
  const [type, ...details] = endpoint.split(':');
  const config = details.join(':');

  switch (type.toLowerCase()) {
    case 'email':
      return { type: 'email', target: config };
    case 'sms':
      return { type: 'sms', target: config };
    case 'slack':
      return { type: 'slack', channel: config };
    case 'pagerduty':
      return { type: 'pagerduty', integrationKey: config };
    default:
      throw new Error(`Unsupported alert endpoint type: ${type}`);
  }
}

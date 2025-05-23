import { VoiceCommandParser } from '@sunnypay/voice-sdk';
import { PaymentOrchestrator } from './PaymentOrchestrator.js';

export class VoicePaymentHandler {
  constructor() {
    this.parser = new VoiceCommandParser();
    this.orchestrator = new PaymentOrchestrator();
  }

  async handleVoiceCommand(voiceInput) {
    try {
      const parsedCommand = await this.parser.parse(voiceInput.audio);
      
      return this.processCommand(parsedCommand);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async processCommand(command) {
    const paymentRequest = {
      amount: command.amount,
      currency: command.currency,
      recipient: await this.resolveVoiceRecipient(command),
      paymentMethod: this.determinePaymentMethod(command),
      voiceMetadata: {
        commandType: command.type,
        confidence: command.confidence
      }
    };

    return this.orchestrator.processPayment(paymentRequest);
  }

  resolveVoiceRecipient(command) {
    // Implementation using existing IdentityManager
    return this.orchestrator.identityManager.resolveVoiceIdentity(
      command.recipientPhrase
    );
  }
}
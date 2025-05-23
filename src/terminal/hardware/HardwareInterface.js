const SerialPort = require('serialport');
const { EventEmitter } = require('events');

/**
 * Hardware Interface for Payment Terminal
 * Handles communication with card readers, display, and keypad
 */
class HardwareInterface extends EventEmitter {
    constructor(config = {}) {
        super();
        this.cardReader = null;
        this.display = null;
        this.keypad = null;
        this.isInitialized = false;
        this.config = config;
    }

    async initialize() {
        try {
            // Initialize card reader interface
            await this.initializeCardReader();
            
            // Initialize display
            await this.initializeDisplay();
            
            // Initialize keypad
            await this.initializeKeypad();
            
            this.isInitialized = true;
            this.emit('ready');
            
            return true;
        } catch (error) {
            this.emit('error', error);
            throw new Error(`Hardware initialization failed: ${error.message}`);
        }
    }

    async initializeCardReader() {
        try {
            // List available serial ports
            const ports = await SerialPort.list();
            
            // Find card reader port (modify vendor/product IDs as needed)
            const readerPort = ports.find(port => 
                port.vendorId === this.config.cardReader?.vendorId || 
                port.productId === this.config.cardReader?.productId ||
                (port.manufacturer && port.manufacturer.includes('Card Reader'))
            );

            if (!readerPort) {
                throw new Error('Card reader not found');
            }

            // Initialize serial connection to card reader
            this.cardReader = new SerialPort({
                path: readerPort.path,
                baudRate: this.config.cardReader?.baudRate || 115200,
                dataBits: this.config.cardReader?.dataBits || 8,
                stopBits: this.config.cardReader?.stopBits || 1,
                parity: this.config.cardReader?.parity || 'none'
            });

            // Set up card reader event handlers
            this.cardReader.on('data', (data) => this.handleCardData(data));
            this.cardReader.on('error', (error) => this.handleCardError(error));

            return true;
        } catch (error) {
            throw new Error(`Card reader initialization failed: ${error.message}`);
        }
    }

    // Card reading functions
    async readCard() {
        return new Promise((resolve, reject) => {
            let cardData = Buffer.alloc(0);
            
            // Set timeout for card read
            const timeout = setTimeout(() => {
                this.cardReader.removeAllListeners('data');
                reject(new Error('Card read timeout'));
            }, 30000);

            // Listen for card data
            const dataHandler = (data) => {
                cardData = Buffer.concat([cardData, data]);
                
                // Check if we have complete card data
                if (this.isCardDataComplete(cardData)) {
                    clearTimeout(timeout);
                    this.cardReader.removeListener('data', dataHandler);
                    resolve(this.parseCardData(cardData));
                }
            };

            this.cardReader.on('data', dataHandler);

            // Send command to read card
            this.sendCardReaderCommand(Buffer.from([0x02, 0x00, 0x01, 0x03]));
        });
    }

    async readChipCard() {
        // Initialize EMV session
        await this.sendCardReaderCommand(Buffer.from([0x02, 0x01, 0x01, 0x03]));
        
        // Select payment application
        const applications = await this.getEmvApplications();
        
        // Process EMV transaction
        return {
            type: 'emv',
            applications,
            // Other EMV data
        };
    }

    async getEmvApplications() {
        // Send SELECT command for Payment System Environment (PSE)
        const selectPse = Buffer.from([
            0x00, 0xA4, 0x04, 0x00, 0x0E, 
            0x31, 0x50, 0x41, 0x59, 0x2E, 
            0x53, 0x59, 0x53, 0x2E, 0x44, 
            0x44, 0x46, 0x30, 0x31
        ]);
        
        const response = await this.sendApduCommand(selectPse);
        return this.parseApplications(response);
    }

    async sendApduCommand(command) {
        // Wrap APDU command for card reader
        const wrappedCommand = Buffer.concat([
            Buffer.from([0x02, command.length + 1, 0x0A]),
            command,
            Buffer.from([0x03])
        ]);
        
        return this.sendCardReaderCommand(wrappedCommand);
    }

    async sendCardReaderCommand(command) {
        return new Promise((resolve, reject) => {
            this.cardReader.write(command, (error) => {
                if (error) reject(error);
                
                // Set up one-time response handler
                const responseHandler = (data) => {
                    this.cardReader.removeListener('data', responseHandler);
                    resolve(data);
                };
                
                this.cardReader.once('data', responseHandler);
            });
        });
    }

    parseCardData(data) {
        // Parse card data based on format (magnetic stripe, EMV, etc.)
        const dataStr = data.toString('hex');
        
        // Check card type
        if (dataStr.startsWith('02')) {
            // Magnetic stripe data
            return this.parseMagneticStripeData(data);
        } else if (dataStr.startsWith('04')) {
            // EMV chip data
            return this.parseEmvData(data);
        }
        
        throw new Error('Unknown card data format');
    }

    parseMagneticStripeData(data) {
        // Skip header and extract track data
        const trackData = data.slice(2, data.length - 1).toString();
        const tracks = trackData.split(';');
        
        return {
            type: 'magnetic_stripe',
            track1: this.parseTrack1(tracks[0]),
            track2: this.parseTrack2(tracks[1])
        };
    }

    parseTrack1(track1) {
        // Format: %B{PAN}^{NAME}^{EXPIRATION_DATE}{SERVICE_CODE}{DISCRETIONARY_DATA}?
        if (!track1 || !track1.startsWith('%B')) return null;
        
        const match = track1.match(/^%B(\d{1,19})\^([^\^]+)\^(\d{4})(.{3})(.+)\?$/);
        if (!match) return null;

        return {
            pan: match[1],
            name: match[2],
            expirationDate: match[3],
            serviceCode: match[4],
            discretionaryData: match[5]
        };
    }

    parseTrack2(track2) {
        // Format: ;{PAN}={EXPIRATION_DATE}{SERVICE_CODE}{DISCRETIONARY_DATA}?
        if (!track2 || !track2.startsWith(';')) return null;
        
        const match = track2.match(/^;(\d{1,19})=(\d{4})(.{3})(.+)\?$/);
        if (!match) return null;

        return {
            pan: match[1],
            expirationDate: match[2],
            serviceCode: match[3],
            discretionaryData: match[4]
        };
    }

    parseEmvData(data) {
        // Parse TLV (Tag-Length-Value) data
        const parsedTags = this.parseTlvData(data.slice(2, data.length - 1));
        
        return {
            type: 'emv',
            tags: parsedTags
        };
    }

    parseTlvData(data) {
        const result = {};
        let offset = 0;
        
        while (offset < data.length) {
            // Parse tag
            const tag = data[offset++].toString(16).padStart(2, '0');
            
            // Parse length
            const length = data[offset++];
            
            // Parse value
            const value = data.slice(offset, offset + length);
            offset += length;
            
            result[tag] = value;
        }
        
        return result;
    }

    // Display functions
    async initializeDisplay() {
        // Initialize display hardware
        // This is a placeholder - implement based on your display hardware
        this.display = {
            clear: () => console.log('\x1Bc'),
            write: (text) => console.log(text),
            showAmount: (amount) => console.log(`Amount: $${amount}`)
        };
        return true;
    }

    async showMessage(message) {
        if (!this.display) {
            throw new Error('Display not initialized');
        }
        
        this.display.write(message);
        return true;
    }

    async showAmount(amount, currency = 'USD') {
        if (!this.display) {
            throw new Error('Display not initialized');
        }
        
        this.display.showAmount(amount);
        return true;
    }

    // Keypad functions
    async initializeKeypad() {
        // Initialize keypad hardware
        // This is a placeholder - implement based on your keypad hardware
        this.keypad = {
            onKey: (callback) => process.stdin.on('data', callback),
            readPin: () => this.readPinInput()
        };
        return true;
    }

    async readPinInput() {
        return new Promise((resolve) => {
            let pin = '';
            console.log('Enter PIN:');
            
            const handleInput = (data) => {
                const key = data.toString().trim();
                if (key === 'Enter') {
                    process.stdin.removeListener('data', handleInput);
                    resolve(pin);
                } else {
                    pin += key;
                    console.log('*');
                }
            };

            process.stdin.on('data', handleInput);
        });
    }

    // Event handlers
    handleCardData(data) {
        this.emit('cardData', data);
    }

    handleCardError(error) {
        this.emit('error', error);
    }

    // Utility functions
    isCardDataComplete(data) {
        // Check if we have complete card data
        // This will depend on your card reader's protocol
        return data.length >= 2 && data[data.length - 1] === 0x03;
    }

    parseApplications(response) {
        // Parse application data from SELECT response
        // This is a simplified implementation
        const applications = [];
        
        // Skip header and extract application data
        const appData = response.slice(2, response.length - 1);
        
        // Parse TLV (Tag-Length-Value) data
        let offset = 0;
        while (offset < appData.length) {
            // Check for application template tag (0x61)
            if (appData[offset] === 0x61) {
                const length = appData[offset + 1];
                const appTemplate = appData.slice(offset + 2, offset + 2 + length);
                
                // Extract AID (Application Identifier)
                const aidOffset = appTemplate.indexOf(0x4F);
                if (aidOffset >= 0) {
                    const aidLength = appTemplate[aidOffset + 1];
                    const aid = appTemplate.slice(aidOffset + 2, aidOffset + 2 + aidLength);
                    
                    // Extract application label
                    const labelOffset = appTemplate.indexOf(0x50);
                    let label = 'Unknown';
                    if (labelOffset >= 0) {
                        const labelLength = appTemplate[labelOffset + 1];
                        label = appTemplate.slice(labelOffset + 2, labelOffset + 2 + labelLength).toString();
                    }
                    
                    applications.push({
                        aid: aid.toString('hex'),
                        label,
                        priority: appTemplate[appTemplate.indexOf(0x87) + 2] || 0
                    });
                }
                
                offset += length + 2;
            } else {
                offset++;
            }
        }
        
        return applications;
    }
}

module.exports = HardwareInterface;


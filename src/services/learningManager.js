const { EventEmitter } = require('events');
const path = require('path');
const fs = require('fs').promises;
const { HNSWLib } = require('langchain/vectorstores/hnswlib');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');

class LearningManager extends EventEmitter {
    constructor() {
        super();
        this.storageDir = path.join(__dirname, '../data/learning');
        this.vectorStore = null;
        this.conversationBuffer = [];
        this.maxBufferSize = 1000;
    }

    async initialize() {
        // Ensure storage directory exists
        await fs.mkdir(this.storageDir, { recursive: true });

        // Initialize vector store
        this.vectorStore = await this.setupVectorStore();

        // Load existing knowledge
        await this.loadExistingKnowledge();

        return true;
    }

    async setupVectorStore() {
        return new HNSWLib({
            space: 'cosine',
            numDimensions: 1536,
            embeddings: new OpenAIEmbeddings()
        });
    }

    async loadExistingKnowledge() {
        const knowledgePath = path.join(this.storageDir, 'knowledge.json');
        try {
            const data = await fs.readFile(knowledgePath, 'utf8');
            const knowledge = JSON.parse(data);
            
            // Add existing knowledge to vector store
            if (knowledge.conversations) {
                await this.vectorStore.addDocuments(
                    knowledge.conversations.map(conv => ({
                        pageContent: `Q: ${conv.question}\nA: ${conv.answer}`,
                        metadata: {
                            timestamp: conv.timestamp,
                            topic: conv.topic
                        }
                    }))
                );
            }
        } catch (error) {
            // No existing knowledge file, start fresh
            await this.saveKnowledge();
        }
    }

    async learnFromConversation(question, answer, metadata = {}) {
        // Add to conversation buffer
        this.conversationBuffer.push({
            question,
            answer,
            timestamp: new Date().toISOString(),
            ...metadata
        });

        // Trim buffer if needed
        if (this.conversationBuffer.length > this.maxBufferSize) {
            this.conversationBuffer = this.conversationBuffer.slice(-this.maxBufferSize);
        }

        // Add to vector store
        await this.vectorStore.addDocuments([{
            pageContent: `Q: ${question}\nA: ${answer}`,
            metadata: {
                timestamp: new Date().toISOString(),
                ...metadata
            }
        }]);

        // Save periodically
        await this.saveKnowledge();

        this.emit('learned', { question, answer, metadata });
    }

    async getRelevantKnowledge(query, limit = 3) {
        if (!this.vectorStore) return [];

        const results = await this.vectorStore.similaritySearch(query, limit);
        return results.map(doc => ({
            content: doc.pageContent,
            metadata: doc.metadata
        }));
    }

    async saveKnowledge() {
        const knowledgePath = path.join(this.storageDir, 'knowledge.json');
        await fs.writeFile(knowledgePath, JSON.stringify({
            conversations: this.conversationBuffer,
            lastUpdated: new Date().toISOString()
        }, null, 2));
    }

    async analyzeKnowledge(topic) {
        const relevantKnowledge = await this.getRelevantKnowledge(topic, 10);
        
        // Analyze patterns and generate insights
        const analysis = {
            topic,
            count: relevantKnowledge.length,
            timestamps: relevantKnowledge.map(k => k.metadata.timestamp),
            // Add more analysis as needed
        };

        return analysis;
    }
}

module.exports = LearningManager;

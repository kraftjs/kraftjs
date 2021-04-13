"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainServer = void 0;
const messages_1 = require("../shared/messages");
const message_server_1 = require("./message-server");
class BlockchainServer extends message_server_1.MessageServer {
    constructor() {
        super(...arguments);
        this.receivedMessagesAwaitingResponse = new Map();
        this.sentMessagesAwaitingReply = new Map();
    }
    get clientIsNotAlone() {
        return this.clients.size > 1;
    }
    handleMessage(sender, message) {
        switch (message.type) {
            case messages_1.MessageTypes.GetLongestChainRequest:
                return this.handleGetLongestChainRequest(sender, message);
            case messages_1.MessageTypes.GetLongestChainResponse:
                return this.handleGetLongestChainResponse(sender, message);
            case messages_1.MessageTypes.NewBlockRequest:
                return this.handleAddTransactionsRequest(sender, message);
            case messages_1.MessageTypes.NewBlockAnnouncement:
                return this.handleNewBlockAnnouncement(sender, message);
            default: {
                console.log(`Received message of unknown type: "${message.type}"`);
            }
        }
    }
    handleGetLongestChainRequest(requestor, message) {
        if (this.clientIsNotAlone) {
            this.receivedMessagesAwaitingResponse.set(message.correlationId, requestor);
            this.sentMessagesAwaitingReply.set(message.correlationId, new Map());
            this.broadcastExcept(requestor, message);
        }
        else {
            this.replyTo(requestor, {
                type: messages_1.MessageTypes.GetLongestChainResponse,
                correlationId: message.correlationId,
                payload: [],
            });
        }
    }
    handleGetLongestChainResponse(sender, message) {
        if (this.receivedMessagesAwaitingResponse.has(message.correlationId)) {
            const requestor = this.receivedMessagesAwaitingResponse.get(message.correlationId);
            if (this.everyoneReplied(sender, message)) {
                const allReplies = this.sentMessagesAwaitingReply
                    .get(message.correlationId)
                    .values();
                const longestChain = Array.from(allReplies).reduce(this.selectTheLongestChain);
                this.replyTo(requestor, longestChain);
            }
        }
    }
    handleAddTransactionsRequest(requestor, message) {
        this.broadcastExcept(requestor, message);
    }
    handleNewBlockAnnouncement(requestor, message) {
        this.broadcastExcept(requestor, message);
    }
    everyoneReplied(sender, message) {
        const repliedClients = this.sentMessagesAwaitingReply
            .get(message.correlationId)
            .set(sender, message);
        const awaitingForClients = Array.from(this.clients).filter((client) => !repliedClients.has(client));
        return awaitingForClients.length === 1;
    }
    selectTheLongestChain(currentlyLongest, current, index) {
        return index > 0 &&
            current.payload.length > currentlyLongest.payload.length
            ? current
            : currentlyLongest;
    }
}
exports.BlockchainServer = BlockchainServer;
//# sourceMappingURL=blockchain-server.js.map
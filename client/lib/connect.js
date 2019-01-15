const ReconnectingWebSocket = require('reconnecting-websocket');
const WebSocket = require('ws');

const url = 'ws://localhost:8080';
const options = {
  WebSocket: WebSocket,
  connectionTimeout: 500,
  maxRetries: 100,
  reconnectionDelayGrowFactor: 0,
  minReconnectionDelay: 1000,
  maxReconnectionDelay: 1000
};

module.exports = () => {
  return new ReconnectingWebSocket(url, [], options);
};
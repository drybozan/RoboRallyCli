import { useEffect } from 'react';
import { w3cwebsocket as WebSocketClient } from 'websocket';

const useWebSocket = (topic,callback) => {
  useEffect(() => {
    const client = new WebSocketClient('ws://localhost:8080/websocket');

    client.onopen = () => {
      console.log('WebSocket connection opened');
    };
    console.log('client');
    console.log(client)

    // client.onmessage = (message) => {
    //     const data = JSON.parse(message.data);
    //     // Gelen mesajın topic'ini kontrol et
    //     if (data.topic === topic) {
    //       callback(data.payload);
    //     }
    //   };

    // client.onclose = () => {
    //   console.log('WebSocket connection closed');
    // };

    // return () => {
    //   client.close();
    // };
  }, [callback]);
};

export default useWebSocket;

import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs'; // Correct import of Client from stompjs
import SockJS from 'sockjs-client'; // Ensure sockjs-client is installed

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [client, setClient] = useState(null);  // Store STOMP client instance

    useEffect(() => {
        // Create a new STOMP client
        const stompClient = new Client({
            brokerURL: 'ws://localhost:9091/ws', // WebSocket endpoint
            connectHeaders: {},
            debug: function (str) {
                console.log(str); // Debugging messages for connection lifecycle
            },
            onConnect: () => {
                console.log('Connected to WebSocket');
                stompClient.subscribe('/chatroom/public', (messageOutput) => {
                    const receivedMessage = JSON.parse(messageOutput.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
            },
            onStompError: (error) => {
                console.error('STOMP error:', error);
            },
        });

        // Activate the WebSocket connection
        stompClient.activate();

        // Save the client for future use (e.g., sending messages)
        setClient(stompClient);

        // Cleanup function to deactivate the client when the component unmounts
        return () => {
            stompClient.deactivate();
        };
    }, []);

    const handleSendMessage = () => {
        if (message.trim() && client) {
            const messageObject = { content: message };
            client.publish({
                destination: '/app/message', // Destination to send the message to
                body: JSON.stringify(messageObject),
            });
            setMessage(''); // Clear the input field after sending
        } else {
            console.log("STOMP client is not connected");
        }
    };

    return (
        <div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index}>{msg.content}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;

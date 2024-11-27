import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const CustomerChat = () => {
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const stompClient = new Client({
            webSocketFactory: () => new SockJS("http://localhost:9091/ws"),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Connected to WebSocket");

                // Subscribe to receive messages
                stompClient.subscribe("/user/private", (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    setMessages((prev) => [...prev, newMessage]);
                });
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => stompClient.deactivate();
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "") {
            client.publish({
                destination: "/app/message",
                body: JSON.stringify({ message }),
            });
            setMessage("");
        }
    };

    return (
        <div>
            <h3>Customer Chat</h3>
            <div>
        <textarea
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
        />
                <button onClick={sendMessage}>Send</button>
            </div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.senderName}: </strong>
                        {msg.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerChat;

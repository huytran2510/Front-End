import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const StaffChat = () => {
    const [client, setClient] = useState(null);
    const [customers, setCustomers] = useState({});
    const [activeCustomer, setActiveCustomer] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const stompClient = new Client({
            webSocketFactory: () => new SockJS("http://localhost:9091/ws"),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Connected to WebSocket");

                // Subscribe to receive messages from all customers
                stompClient.subscribe("/user/private", (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    setCustomers((prev) => ({
                        ...prev,
                        [newMessage.senderName]: [
                            ...(prev[newMessage.senderName] || []),
                            newMessage,
                        ],
                    }));
                });
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => stompClient.deactivate();
    }, []);

    const sendMessage = () => {
        if (activeCustomer && message.trim() !== "") {
            client.publish({
                destination: "/app/reply",
                body: JSON.stringify({
                    receiverName: activeCustomer,
                    message,
                }),
            });
            setMessage("");
        }
    };

    return (
        <div>
            <h3>Staff Chat</h3>
            <div style={{ display: "flex" }}>
                <div style={{ width: "30%", borderRight: "1px solid black" }}>
                    <h4>Customers</h4>
                    <ul>
                        {Object.keys(customers).map((customer) => (
                            <li
                                key={customer}
                                style={{
                                    cursor: "pointer",
                                    fontWeight: activeCustomer === customer ? "bold" : "normal",
                                }}
                                onClick={() => setActiveCustomer(customer)}
                            >
                                {customer}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ width: "70%", padding: "10px" }}>
                    <h4>Messages</h4>
                    <ul>
                        {(customers[activeCustomer] || []).map((msg, index) => (
                            <li key={index}>
                                <strong>{msg.senderName}: </strong>
                                {msg.message}
                            </li>
                        ))}
                    </ul>
                    <textarea
                        rows="3"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default StaffChat;

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {useLocalStorage} from "../../util/useLocalStorage"; // Thư viện của bạn

const ChatBox = () => {
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [jwt, setJwt] = useLocalStorage("", "jwt")

    // Lấy tên người dùng từ JWT hoặc mặc định là "client"
    const getSenderName = () => {
        if (jwt) {
            try {
                const decoded = jwtDecode(jwt);
                return decoded.username || "client"; // Tùy vào cấu trúc JWT của bạn
            } catch (error) {
                console.error("Invalid JWT:", error);
                return "client";
            }
        }
        return "client";
    };

    const senderName = getSenderName();

    useEffect(() => {
        const stompClient = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Connected to WebSocket");

                // Subscribe to private messages
                stompClient.subscribe("/user/private", (message) => {
                    const msg = JSON.parse(message.body);
                    setMessages((prev) => [...prev, msg]);
                });
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => stompClient.deactivate();
    }, []);

    const sendMessage = () => {
        if (receiverName && message.trim() !== "") {
            client.publish({
                destination: "/app/private-message",
                body: JSON.stringify({
                    senderName, // Lấy từ JWT
                    receiverName,
                    message,
                }),
            });
            setMessage("");
        } else {
            alert("Vui lòng nhập người nhận và tin nhắn!");
        }
    };

    return (
        <div style={{ padding: "20px", border: "1px solid black", width: "300px" }}>
            <h3>Private Chat</h3>
            <div>
                <input
                    type="text"
                    placeholder="Receiver Name"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                />
            </div>
            <textarea
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your private message..."
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                <h4>Messages:</h4>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.senderName}: </strong>
                            {msg.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatBox;

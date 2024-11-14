import React, {useEffect, useState} from "react";
import "../../css/icon.css"
import { Client } from '@stomp/stompjs';

const IconChat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:9091/ws', // Ensure this matches the server URL
            connectHeaders: {},
            debug: function (str) {
                console.log(str);
            },
            onConnect: () => {
                console.log('Connected to WebSocket');
                client.subscribe('/chatroom/public', (messageOutput) => {
                    const receivedMessage = JSON.parse(messageOutput.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            },
            onDisconnect: () => {
                console.log('Disconnected');
            },
        });

        client.activate(); // Kích hoạt kết nối WebSocket

        setStompClient(client);

        return () => {
            client.deactivate(); // Đảm bảo đóng kết nối khi component bị unmount
        };
    }, []);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleSendMessage = () => {
        if (message.trim() && stompClient) {
            const messageObject = { content: message };
            stompClient.publish({
                destination: '/app/message', // Gửi tin nhắn tới server
                body: JSON.stringify(messageObject),
            });
            setMessage(''); // Xóa nội dung input
        }
    };

    return (
        <div className="chat-container">
            {/* Chat Icon */}
            <div className="chat-icon" onClick={toggleChat}>
                <i className="fa fa-comment"></i>
            </div>

            {/* Chat Box */}
            {isChatOpen && (
                <div className="chat-box">
                    <div className="chat-header">
                        <span>Chat with us</span>
                        <button onClick={toggleChat}>X</button>
                    </div>
                    <div className="chat-body">
                        {messages.map((msg, index) => (
                            <p key={index}>{msg.content}</p>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default IconChat
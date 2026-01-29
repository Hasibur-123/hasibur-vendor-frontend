import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './ChatWindow.css';

const socket = io.connect(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`); // Connect once

const ChatWindow = ({ currentUserId, targetUserId, targetName, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        if (currentUserId && targetUserId) {
            axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chat/${currentUserId}/${targetUserId}`)
                .then((res) => {
                    setRoomId(res.data._id);
                    setMessages(res.data.messages);
                    socket.emit('join_room', res.data._id);
                })
                .catch(err => console.error(err));
        }
    }, [currentUserId, targetUserId]);

    useEffect(() => {
        const receiveHandler = (data) => {
            setMessages((list) => [...list, data]);
        };
        socket.on('receive_message', receiveHandler);

        return () => {
            socket.off('receive_message', receiveHandler);
        };
    }, []);

    const sendMessage = async () => {
        if (currentMessage !== '' && roomId) {
            const messageData = {
                roomId: roomId,
                senderId: currentUserId,
                text: currentMessage,
                timestamp: new Date(),
            };

            await socket.emit('send_message', messageData);
            setCurrentMessage('');
        }
    };

    return (
        <div className="chat-window-container glass-card">
            {/* Header */}
            <div className="chat-header">
                <span className="chat-title">Chat with {targetName}</span>
                <button onClick={onClose} className="chat-close-btn">×</button>
            </div>

            {/* Body */}
            <div className="chat-body custom-scrollbar">
                {messages.map((msg, index) => {
                    const isMe = msg.senderId === currentUserId || (msg.senderId && msg.senderId._id === currentUserId);
                    return (
                        <div key={index} className={`chat-message ${isMe ? 'message-own' : 'message-other'}`}>
                            <p className="message-text">{msg.text}</p>
                            <span className="message-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Type a message..."
                    onChange={(event) => setCurrentMessage(event.target.value)}
                    onKeyPress={(event) => event.key === 'Enter' && sendMessage()}
                    className="chat-input"
                />
                <button onClick={sendMessage} className="chat-send-btn">➤</button>
            </div>
        </div>
    );
};

export default ChatWindow;

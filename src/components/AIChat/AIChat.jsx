import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

import './AIChat.css'; // Import the CSS file

const AIChat = () => {
    const [userInput, setUserInput] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);
    const [typingText, setTypingText] = useState('');

const handleSendMessage = async () => {
    try {
        const API_KEY = process.env.REACT_APP_GOOGLE_AI_API_KEY;
    
            if (!API_KEY) {
                throw new Error('API key not provided. Set REACT_APP_GOOGLE_AI_API_KEY environment variable.');
            }
    
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
            const generationConfig = {
                temperature: 0.9,
                topK: 1,
                topP: 1,
                maxOutputTokens: 2048,
            };
    
            const safetySettings = [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            ];
    
            const parts = [
                { text: userInput },
            ];
    
            const result = await model.generateContent({
                contents: [{ role: 'user', parts }],
                generationConfig,
                safetySettings,
            });
    
        const responseText = result.response.text();

        // Determine the type of response and format accordingly
        let formattedResponse;
        if (responseText.includes('```')) {
            // Format as code block
            formattedResponse = (
                <div className="code-block">
                    <pre>{responseText}</pre>
                </div>
            );
        } else if (responseText.includes('*')) {
            // Format as points
            const points = responseText.split('*').map((point, index) => {
                return point.trim() && index !== 0 ? `${index}. ${point.trim()}` : null;
            }).filter(Boolean);

            formattedResponse = (
                <ul>
                    {points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            );
        } else {
            // Format as a letter or general instruction
            formattedResponse = (
                <div className="formatted-response">
                    {responseText}
                </div>
            );
        }

        // Update message history with user and AI messages
        setMessageHistory([
            ...messageHistory,
            { text: userInput, type: 'user' },
            { text: formattedResponse, type: 'ai' },
        ]);

        // Clear the input field
        setUserInput('');
    } catch (error) {
        console.error('Error in Gemini AI:', error.message);
    }
};

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSendMessage();
    };

    useEffect(() => {
        // Clear typingText when userInput changes
        setTypingText('');
    }, [userInput]);

    return (
        <div className="chat-container">
            <div className="message-history">
                <div className="scrollable-area">
                    {messageHistory.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    ))}
                    {typingText && <div className="message ai-typing">{typingText}</div>}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="user-input">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
};

export default AIChat;

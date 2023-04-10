import React, { useState } from 'react';
import openai from 'openai';
import {Configuration, OpenAIApi} from 'openai'
const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);


  const openaiAPI = new OpenAIApi(
    new Configuration({
      apiKey: "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",
    })
  )
  
  
  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
  
    const response = await openaiAPI.createChatCompletion({
      model: "gpt-3.5-turbo",
  
      messages: [{ role: "user", content:input}],        
    })
    console.log(response.data.choices[0].message.content)
   
    setMessages([...messages, { text: response.data.choices[0].message.content ,sender: 'bot' }]);
  };

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li>
            <strong>{message.sender}:</strong> {message.text}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input type="text" value={input} onChange={handleInput} />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default Chat;
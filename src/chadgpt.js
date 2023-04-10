import React, { useState } from 'react';
import {Configuration, OpenAIApi} from 'openai'
import './App.css'
import YourSvg from './🗿 (2).svg'
const Chad = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  const openaiAPI = new OpenAIApi(
    new Configuration({
      apiKey: "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",
    })
  )
  
  
  const sendMessage =async (event) => {
    event.preventDefault();
    setMessages([...messages, { text: input, sender:"👤" }]);
    setInput('');
    const response  = await openaiAPI.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content:input}],
      })
 
      setMessages([...messages, { text: input, sender: '👤' }, { text: response.data.choices[0].message.content ,sender: '🗿' }]);
  
  };
  console.log(messages)
 
  return (<>   <img src={YourSvg} alt="Your SVG"  class="center"/>
    <div className="chat">
      <div className="chat-messages">
        {messages.map((message,index) => (
          <div key={index}className={`chat-message ${message.sender === '👤' ? 'chat-message-user' : 'reply'}`}>
            <div className={`chat-message-text${message.sender === '👤' ? 'chat-message-user' : 'reply'}`}>{message.sender}  {message.text}</div>
           
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={sendMessage}>
        <input className="chat-input" type="text" value={input} onChange={handleInput} />
        <button className="chat-button" type="submit">Send</button>
      </form>
    </div></>
  );
};

export default Chad;
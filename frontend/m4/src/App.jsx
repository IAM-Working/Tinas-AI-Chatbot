import './App.css'
import { useState } from 'react'

function App() {
  const [userInput, setUserInput] = useState('')
  const [tinaResponse, setTinaResponse] = useState('')
  const [conversation, setConversation] = useState([{ sender: 'tina', message: 'Hello! Can I help you select the best insurance policy?' }])

  return (
    <>
      <section id="center">
       <div className="container">
            <h3 className='head'>Tina - Your Ai Insurance Policy Assistant</h3>
          <div className='display'>
            {conversation.map((item, index) => (
              <p key={index} className={item.sender === 'user' ? 'user-message' : 'tina-message'}>
                {item.sender === 'user' ? `You: ${item.message}` : `Tina: ${item.message}`}
              </p>
            ))}
          </div>
          <div className='input-container'>
          <input 
            type="text" 
            className='input' 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className='btn'
            onClick={ async () => {
              setConversation(conversation => [...conversation, { sender: 'user', message: userInput }])
              setUserInput('')
               await fetch('http://localhost:3000/tina', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ conversation: [...conversation, { sender: 'user', message: userInput }] }),
              })
              .then(response => response.json())
              .then(data => {
                setConversation(conversation => [...conversation, { sender: 'tina', message: data.tinaResponse }])
                setTinaResponse('')
              })
              .catch(error => {
                console.error('Error:', error);
              })
            }}
          >Send</button>
          </div>
       </div>
      </section>
    </>
  )
}

export default App

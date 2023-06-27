import React, { useState, useEffect, useRef } from 'react'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import ChatHeader from './components/ChatHeader'
import { randomName } from './utils/randomName'
import { randomColor } from './utils/randomColor'
import messageDeleteSound from './sound/message-delete.mp3'
import './App.css'

const App = () => {
  const [messages, setMessages] = useState([])
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  })
  const [darkMode, setDarkMode] = useState(false)

  const droneRef = useRef(
    new window.Scaledrone(process.env.REACT_APP_SCALEDRONE_CHANNEL_ID || "yyKhKOnYWDhPvZfM", {
      data: member,
    })
  )

  useEffect(() => {
    const drone = droneRef.current

    drone.on('open', (error) => {
      if (error) {
        return console.error(error)
      }
      setMember((prevMember) => ({ ...prevMember, id: drone.clientId }))
    })

    const room = drone.subscribe('observable-chatroom')
    room.on('data', (data, member) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Math.random(), member, text: data },
      ])
    })
  }, [])

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode)
  }

  const sendMessage = (message) => {
    droneRef.current.publish({
      room: 'observable-chatroom',
      message,
    })
  }

  const deleteMessage = (id) => {
    const newMessages = messages.filter((msg) => msg.id !== id)
    setMessages(newMessages)
    const audio = new Audio(messageDeleteSound)
    audio.play()
  }

  return (
    <div className={`chat-app-sb ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <ChatHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <ChatMessages
        messages={messages}
        currentMember={member}
        deleteMessage={deleteMessage}
      />
      <ChatInput sendMessage={sendMessage} />
    </div>
  )
}

export default App;

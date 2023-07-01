import React, { useState, useEffect, useRef } from 'react'
import ChatMessages from './components/ChatMessages/ChatMessages'
import ChatInput from './components/ChatInput/ChatInput'
import ChatHeader from './components/ChatHeader/ChatHeader'
import { randomName } from './utils/randomName'
import { randomColor } from './utils/randomColor'
import messageDeleteSound from './sounds/message-delete.wav'
import './App.css'



const App = () => {
  const [messages, setMessages] = useState([])
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  })
  const [background, setBackground] = useState(false)

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

  const toggleBackground = () => {
    setBackground((prevBackground) => !prevBackground)
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
    <div className={`chatApp ${background ? 'bgPaper' : 'bgWood'}`}>
      <ChatHeader background={background} toggleBackground={toggleBackground} />
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

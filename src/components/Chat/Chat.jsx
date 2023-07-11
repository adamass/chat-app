import React, { useState, useEffect, useRef } from 'react'
import ChatMessages from '../ChatMessages/ChatMessages'
import ChatInput from '../ChatInput/ChatInput'
import ChatHeader from '../ChatHeader/ChatHeader'
import { randomColor } from '../../helpers/randomColor'
import messageDeleteSound from '../../sounds/message-delete.wav'
import styles from "./Chat.module.css"



const Chat = (props) => {
  const [messages, setMessages] = useState([])
  const [member, setMember] = useState({
    username: props.username,
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
  }, [droneRef])

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

  const handleLogOut = () => {
    window.location.reload(true);
  }

  return (
    <div className={[styles.chatApp, `${background ? styles.bgPaper : styles.bgWood}`].join(' ')}>
      <ChatHeader background={background} toggleBackground={toggleBackground} handleLogOut={handleLogOut}/>
      <ChatMessages
        messages={messages}
        currentMember={member}
        deleteMessage={deleteMessage}
      />
      <ChatInput sendMessage={sendMessage} />
    </div>
  )
}

export default Chat;

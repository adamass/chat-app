import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import messageSentSound from '../sound/message-sent.mp3'

const ChatInput = ({ sendMessage }) => {
  const [text, setText] = useState('')

  const onChange = (e) => {
    setText(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) {
      return
    }
    setText('')
    sendMessage(text.trim())
    playMessageSentSound()
  }

  const playMessageSentSound = () => {
    const audio = new Audio(messageSentSound)
    audio.play()
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          placeholder='Upiši poruku i pritisni ENTER'
          autoFocus={true}
        />
        <button>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  )
}

export default ChatInput
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import messageSentSound from '../../sounds/message-sent.mp3'
import clickButtonSound from '../../sounds/click-button.mp3'
import styles from './ChatInput.module.css'

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

  const handleBtnSound = () => {
    const audio = new Audio(clickButtonSound)
    audio.play()
  }

  return (
    <div>
      <form className={styles['formLook']} onSubmit={onSubmit}>
        <input
          className={styles['inputLook']}
          onChange={onChange}
          value={text}
          placeholder='Write a message...'
          autoFocus={true}
        />
        <button className={styles['btnLook']} onClick={handleBtnSound}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  )
}

export default ChatInput
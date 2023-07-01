import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from "./ChatMessages.module.css"

const ChatMessages = ({ messages, currentMember, deleteMessage }) => {
  const renderMessage = (message) => {
    const { id, member, text } = message
    const messageFromMe = member && member.id === currentMember.id

    const onDeleteClick = () => {
      deleteMessage(id)
    }

    return (
      <li key={id} className={messageFromMe ? [styles.chatMessage, styles.currentUser].join(' ') : styles.chatMessage}>
        <span
          className={styles['profileColor']}
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className={styles['chatContent']}>
          <div className={styles['username']}>{member.clientData.username}</div>
          <div className={styles['textMessage']}>{text}</div>
          {messageFromMe && (
            <div className={styles['deleteIcon']} onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </div>
          )}
        </div>
      </li>
    )
  }

  return <ul className={styles['chatList']}>{messages.map((m) => renderMessage(m))}</ul>
}

export default ChatMessages
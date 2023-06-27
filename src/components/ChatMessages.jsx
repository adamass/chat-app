import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const ChatMessages = ({ messages, currentMember, deleteMessage }) => {
  const renderMessage = (message) => {
    const { id, member, text } = message
    const messageFromMe = member && member.id === currentMember.id
    const className = messageFromMe
      ? 'chat-message current-user'
      : 'chat-message'

    const onDeleteClick = () => {
      deleteMessage(id)
    }

    return (
      <li key={id} className={className}>
        <span
          className='profile-color'
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className='chat-content'>
          <div className='username'>{member.clientData.username}</div>
          <div className='text-message'>{text}</div>
          {messageFromMe && (
            <div className='delete-icon' onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </div>
          )}
        </div>
      </li>
    )
  }

  return <ul className='chat-list'>{messages.map((m) => renderMessage(m))}</ul>
}

export default ChatMessages
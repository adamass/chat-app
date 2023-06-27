import React from 'react'

const ChatHeader = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className='chat-app-sb-header'>
      <h1>Chat App SB</h1>
      <label className='toggle-theme-btn'>
        <input type='checkbox' checked={darkMode} onChange={toggleDarkMode} />
        <span className='slider' />
      </label>
    </div>
  )
}

export default ChatHeader
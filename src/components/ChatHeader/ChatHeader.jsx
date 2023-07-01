import React from 'react'
import styles from "./ChatHeader.module.css"

const ChatHeader = ({ background, toggleBackground }) => {
  return (
    <div className={styles['chatHeader']}>
      <h1>Welcome! <br/> Have a nice day.</h1>
      <label className={styles['btnSwitchTheme']}>
        <input type='checkbox' checked={background} onChange={toggleBackground} />
        <span className={styles['slider']}/>
      </label>
    </div>
  )
}

export default ChatHeader
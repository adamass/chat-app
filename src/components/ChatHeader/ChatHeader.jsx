import React, { useEffect, useRef, useState } from 'react'
import styles from "./ChatHeader.module.css"
import menuIcon from '../../images/menuIcon.png'
import logOut from '../../images/logOutIcon.png'

const ChatHeader = ({ background, toggleBackground, handleLogOut }) => {

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {

    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handler);

    return() => {
      document.removeEventListener("mousedown", handler);
    }
  })

  return (
    <div className={styles['chatHeader']} ref={menuRef}>
      <h1>Welcome! <br/> Have a nice day.</h1>
      <div>
        <div className={styles['menuTrigger']} onClick={() => {setOpen(!open)}} >
          <img src={menuIcon} alt="Menu icon" />
        </div>
      </div>
      <div className={[styles.dropdownMenu, `${open ? styles.active : styles.inactive}`].join(' ')}>
        <h3>Menu</h3>
        <ul>
            <li className={styles["dropdownItem"]}>
              <label className={styles['btnSwitchTheme']}>
                <input type='checkbox' checked={background} onChange={toggleBackground} />
                <span className={styles['slider']}/>
              </label>
              <a>Background</a>
            </li>
            <li className={styles["dropdownItem"]}>
              <img src={logOut} onClick={handleLogOut} alt="Log out" />
              <a>Log out</a>
            </li>
        </ul>
      </div>
    </div>
  )
}


export default ChatHeader
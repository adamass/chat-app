import React, { useEffect, useRef, useState } from 'react'
import styles from "./ChatHeader.module.css"
import menuIcon from '../../images/menuIcon.png'
import settings from '../../images/settingsIcon.png'
import logOut from '../../images/logOutIcon.png'

const ChatHeader = ({ background, toggleBackground }) => {

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
    <div className={styles['chatHeader']}>
      <h1>Welcome! <br/> Have a nice day.</h1>
      <div ref={menuRef}>
        <div className={styles['menuTrigger']} onClick={() => {setOpen(!open)}}>
          <img src={menuIcon} alt="Menu icon" />
        </div>
      </div>
      <div className={[styles.dropdownMenu, `${open ? styles.active : styles.inactive}`].join(' ')}>
        <h3>Menu</h3>
        <ul>
            <DropdownItem img={settings} text={"Settings"}>
              <DropdownItemItem/>
            </DropdownItem>
            <DropdownItem img={logOut} text={"Logout"}/>
        </ul>
      </div>
      <label className={styles['btnSwitchTheme']}>
        <input type='checkbox' checked={background} onChange={toggleBackground} />
        <span className={styles['slider']}/>
      </label>
    </div>
  )
}

function DropdownItem(props) {
  return(
    <li className={styles['dropdownItem']}>
      <img src={props.img} />
      <a> {props.text} </a>
    </li>
  );
}

// function DropdownItemItem(props) {
//   return(
//     <label className={styles['btnSwitchTheme']}>
//     <input type='checkbox' checked={props.background} onChange={props.toggleBackground} />
//     <span className={styles['slider']}/>
//   </label>
//   );
// }

export default ChatHeader
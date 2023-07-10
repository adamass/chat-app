import React, { useState } from "react";
import styles from "./Login.module.css"
import clickButtonSound from '../../sounds/click-button.mp3'



function Login(props) {
   const [name, setName] = useState("");
   const handleChange = (event) => {
    setName(event.target.value);
   }
   const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(name);
   }

   const handleBtnSound = () => {
    const audio = new Audio(clickButtonSound)
    audio.play()
  }

  return (
    <div className={styles["containerForm"]}>
      <form className={styles["loginForm"]} onSubmit={handleSubmit}>
        <input
          className={styles["inputLook"]}
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Enter your name..."
          pattern="^(?!\s*$).+"
          title="Enter at least one word character."
          maxLength="15"
          required
        />
        <button className={styles["btnLook"]} type="submit" onClick={handleBtnSound}>Login</button>
      </form>
    </div>
  );
}

export default Login;
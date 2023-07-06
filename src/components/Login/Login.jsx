import React, { useState } from "react";
import styles from "./Login.module.css"


function Login(props) {
   const [name, setName] = useState("");
   const handleChange = (event) => {
    setName(event.target.value);
   }
   const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(name);
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
        <button className={styles["btnLook"]} type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
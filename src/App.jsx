import { useState } from 'react';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import "./App.css";


const App = () => {
   const [name, setName] = useState("");
  
  const getName = (data) => {
    setName(data);
  }
  
 
  return (
    <div>
      {!name && <Login onSubmit={getName}></Login>}
      {name && <Chat username={name}></Chat>}
    </div>
  )
}

export default App;

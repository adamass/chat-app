import { useState } from 'react';
import Login from './components/Login/Login';
import MyChatApp from './components/MyChatApp/MyChatApp';
import "./App.css";


const App = () => {
   const [name, setName] = useState("");
  
  const getName = (data) => {
    setName(data);
  }
  
 
  return (
    <div>
      {!name && <Login onSubmit={getName}></Login>}
      {name && <MyChatApp username={name}></MyChatApp>}
    </div>
  )
}

export default App;


import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat'

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName]=useState("");
  const [room, setRoom]=useState("");
  const [showChat, setShowChat]=useState(false);

  const joinRoom=()=>{
    if (userName!=="" && room !==""){
      socket.emit("join_room", room);
      setShowChat(true);
    }

  };

  return (
    <div className="App">
      <h1>Connecting Lives</h1>
      <h2>{userName}</h2>
      
      {!showChat?(
      <div className='joinChatContainer'>
      <h3>Join a chat</h3>
      <input type="text" placeholder="Name.." onChange={(event)=>{setUserName(event.target.value)}}/>
      <input type="text" placeholder="Room ID.." onChange={(event)=>{setRoom(event.target.value)}}/>
      <button onClick={joinRoom}> Join A Room</button>
      </div>
      )
      :
  (
      <Chat socket={socket} username={userName} room={room} />
      
  )}
  <h5>Made with 	&hearts; by Karthik</h5>
    </div>
  );
}

export default App;

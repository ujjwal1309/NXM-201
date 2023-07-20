import logo from './logo.svg';
// import './App.css';
import React, { useEffect, useState } from "react";


function App() {
  let [btn,setBtn]=useState(false);
  
  return (
    <div className="App">
      <button onClick={
        ()=>{
          setBtn(!btn)
          console.log(btn)
        }
      }>{btn?"On":"Off"}</button>
    </div>
  );
}

export default App;

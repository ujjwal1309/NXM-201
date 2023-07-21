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

Allow me to introduce myself briefly. My name is [Your Full Name], and I am currently a [Grade Level] student at [Current School Name]. I have consistently demonstrated a strong passion for learning and a commitment to achieving academic excellence. Throughout my academic journey, I have actively engaged in various extracurricular activities, which have shaped me into a well-rounded individual with leadership skills and a desire to contribute positively to my community.
export default App;

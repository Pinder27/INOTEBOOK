import React, { useState } from "react";

import { Navabar } from "./components/Navabar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notestate from "./context/notes/Notestate";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert"

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message,type)=>{
    setAlert({message: message,
    type:type})
     setTimeout(()=>{
       setAlert(null)
     },1500)
  }
  return (
    <>
      <Notestate showAlert={showAlert}>
        <BrowserRouter>
          <Navabar />
        <Alert alert = {alert}/>
          <div className="container">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Home showAlert={showAlert}/>} />
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </Notestate>
    </>
  );
}

export default App;

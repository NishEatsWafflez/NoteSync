import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './login'
import Classes from './classes'
import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();


function App() {
  return (  
    <main className = "App">
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/classes" element={<Classes/>}/>
          {/* <Route exact path="/upcoming/:user" element={<Upcoming/>}/>
          <Route exact path="/record/:user" element={<Record/>}/> */}
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>    </main>
    
  );
}

export default App;

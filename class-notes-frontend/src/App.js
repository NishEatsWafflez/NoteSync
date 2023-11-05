import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/authProvider';
import { RequireAuth } from './context/requireAuth';
import Login from './login'
import Classes from './classes'
import ClassSummary from './classSummary'

import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();


function App() {
  return (  
    <AuthProvider>
      <main className = "App">
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/classes" element={<RequireAuth><Classes/></RequireAuth>}/>
            <Route exact path="/class/:id" element={<RequireAuth><ClassSummary/></RequireAuth>}/>
            {/* <Route exact path="/upcoming/:user" element={<Upcoming/>}/>
            <Route exact path="/record/:user" element={<Record/>}/> */}
            {/* <Route path="*" element={<NotFound/>}/> */}
          </Routes>    </main>
    </AuthProvider>
    
  );
}

export default App;

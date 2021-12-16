import React from "react";
import Mainpage from "./components/Mainpage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Murlocpage from "./components/Murlocpage";
import './index.css';


function App() {
  return (
    <div className="bg-slate-800">
    <Router>
      <Routes>
        <Route exact path="/" element={<Murlocpage></Murlocpage>}></Route>
        <Route exact path="/:id" element={<Mainpage></Mainpage>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;

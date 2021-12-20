import React from "react";
import Mainpage from "./components/Mainpage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Murlocpage from "./components/Murlocpage";
import './index.css';
import IdPage from "./components/IdPage";

//Optional Parameters?

function App() {
  return (
    <div className="bg-slate-800 min-h-full">
    <Router>
      <Routes>
        <Route exact path="/" element={<Murlocpage></Murlocpage>}></Route>
        <Route exact path="/:id" element={<Mainpage></Mainpage>}></Route>
        <Route exact path="/:id/:mediaType/:actualId" element={<IdPage></IdPage>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;

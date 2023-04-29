import { useState } from 'react'
import './App.css'
import Panel from "./components/Panel.jsx";
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Animals from './components/Animals';
function App() {

  return (
    <>
      <Panel />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/animals" element={<Animals />} />
      </Routes>
    </>
  );
}

export default App

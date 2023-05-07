import { useState } from 'react'
import './App.css'
import Panel from "./components/Panel.jsx";
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Animals from './components/Animals';
import { UserContext } from './context/UserContext';
import NewAnimalForm from './components/NewAnimalForm';
import Donations from './components/Donations';
function App() {
  const [user, setUser] = useState("User")
  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <Panel />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/newAnimal" element={<NewAnimalForm />} />
          <Route path="/donations" element={<Donations />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App

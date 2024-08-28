import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SpellList from './components/SpellList';
import SpellDetails from './pages/SpellDetails';
import NavBar from './components/Navbar'; // Corrigido para Navbar

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spells" element={<SpellList />} />
        <Route path="/spell/:spellIndex" element={<SpellDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

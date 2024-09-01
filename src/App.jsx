import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/SpellHome';
import SpellList from './pages/SpellList';
import SpellDetails from './pages/SpellDetails';
import NavBar from './components/Navbar';
import Favorites from './pages/SpellFavorite';
import Glossary from './pages/SpellGlossary';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spells" element={<SpellList />} />
        <Route path="/spell/:spellIndex" element={<SpellDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/glossary" element={<Glossary />} />
      </Routes>
    </Router>
  );
}

export default App;

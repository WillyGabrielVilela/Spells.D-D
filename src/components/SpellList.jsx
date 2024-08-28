import { useEffect, useState } from 'react';
import { fetchSpells, fetchSpellDetails, fetchClasses } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/styles.scss';
import cantripIcon from '../assets/cantrip-icon.svg';
import ritualIcon from '../assets/ritual-icon.svg';
import searchIcon from '../assets/search-icon.svg';
import Spinner from '../components/Spinner'; // Importa o Spinner

const SpellList = () => {
  const [spells, setSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [isCantripFilter, setIsCantripFilter] = useState(false);
  const [isRitualFilter, setIsRitualFilter] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    fetchSpells()
      .then(spellsData => {
        setSpells(spellsData.results);
        setFilteredSpells(spellsData.results);
        setLoadingDetails(spellsData.results.map(spell => spell.index));
        return Promise.all(
          spellsData.results.map(spell =>
            fetchSpellDetails(spell.index).then(details => {
              setSpells(prevSpells =>
                prevSpells.map(s =>
                  s.index === spell.index ? { ...s, ...details } : s
                )
              );
              setLoadingDetails(prevLoading => prevLoading.filter(id => id !== spell.index));
            })
          )
        );
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false)); // Define loading como false após o carregamento ser concluído

    fetchClasses()
      .then(classesData => {
        const filteredClasses = classesData.filter(cls => !['Barbarian', 'Fighter', 'Monk', 'Rogue'].includes(cls.name));
        setAvailableClasses(filteredClasses);
      })
      .catch(err => setError(err));
  }, []);

  useEffect(() => {
    let filtered = spells;

    if (filterTerm) {
      filtered = filtered.filter(spell =>
        spell.name.toLowerCase().includes(filterTerm.toLowerCase())
      );
    }

    if (isCantripFilter) {
      filtered = filtered.filter(spell => spell.level === 0);
    }

    if (isRitualFilter) {
      filtered = filtered.filter(spell => spell.ritual);
    }

    if (selectedClasses.length > 0) {
      filtered = filtered.filter(spell =>
        spell.classes?.some(cls => selectedClasses.includes(cls.name))
      );
    }

    setFilteredSpells(filtered);
    setNoResults(filtered.length === 0);
  }, [filterTerm, spells, isCantripFilter, isRitualFilter, selectedClasses]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setFilterTerm(searchTerm);
  };

  const handleCantripFilterChange = () => {
    setIsCantripFilter(prev => !prev);
  };

  const handleRitualFilterChange = () => {
    setIsRitualFilter(prev => !prev);
  };

  const handleClassFilterChange = (className) => {
    setSelectedClasses(prev =>
      prev.includes(className) ? prev.filter(c => c !== className) : [...prev, className]
    );
  };

  if (error) return <p>Erro ao carregar dados: {error.message}</p>;

  return (
    <div className="spell-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Buscar magias..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <img src={searchIcon} alt="Buscar" className="search-icon" />
        </button>
        <div className="filters">
          <label>
            <input
              type="checkbox"
              checked={isCantripFilter}
              onChange={handleCantripFilterChange}
            />
            Cantrips
          </label>
          <label>
            <input
              type="checkbox"
              checked={isRitualFilter}
              onChange={handleRitualFilterChange}
            />
            Ritual
          </label>
          {availableClasses.length > 0 && (
            <div className="class-filters">
              {availableClasses.map(cls => (
                <label key={cls.name}>
                  <input
                    type="checkbox"
                    checked={selectedClasses.includes(cls.name)}
                    onChange={() => handleClassFilterChange(cls.name)}
                  />
                  {cls.name}
                </label>
              ))}
            </div>
          )}
        </div>
      </form>

      <p className="total-count">Total de magias encontradas: {filteredSpells.length}</p>

      <div className="spinner-overlay" style={{ display: loading ? 'block' : 'none' }}>
        <Spinner />
      </div>

      <div className="spell-grid" style={{ display: loading ? 'none' : 'grid' }}>
        {noResults ? (
          <p className="no-results-message">Digite uma magia válida</p>
        ) : (
          filteredSpells.map(spell => (
            <Link key={spell.index} to={`/spell/${spell.index}`} className="spell-card">
              <div className="spell-header">
                <h2>
                  {spell.name || <div className="skeleton skeleton-text"></div>}
                  {spell.level === 0 && <img src={cantripIcon} alt="Cantrip Icon" className="cantrip-icon" />}
                  {spell.ritual && <img src={ritualIcon} alt="Ritual Icon" className="ritual-icon" />}
                </h2>
                <p className="spell-type">{spell.school?.name || <div className="skeleton skeleton-text"></div>}</p>
              </div>
              <div className="spell-details">
                {loadingDetails.includes(spell.index) ? (
                  <>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                  </>
                ) : (
                  <>
                    <p><strong>Tempo de Conjuração:</strong> {spell.casting_time || 'Desconhecido'}</p>
                    <p><strong>Alcance/Área:</strong> {spell.range || 'Desconhecido'}</p>
                    <p><strong>Duração:</strong> {spell.duration || 'Desconhecido'}</p>
                    <p><strong>Componentes:</strong> {spell.components?.join(', ') || 'N/A'}</p>
                  </>
                )}
              </div>
              <div className="spell-footer">
                <p><strong>Classes:</strong> {spell.classes ? spell.classes.map(c => c.name).join(', ') : 'N/A'}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SpellList;

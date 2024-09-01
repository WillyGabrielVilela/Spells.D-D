import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSpellDetails } from '../services/api';
import Spinner from '../components/Spinner';
import '../styles/spellDetails.scss';
import cantripIcon from '../assets/cantrip-icon.svg';
import ritualIcon from '../assets/ritual-icon.svg';

const SpellDetails = () => {
  const { spellIndex } = useParams();
  const navigate = useNavigate();
  const [spell, setSpell] = React.useState(null);
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    // Carregar os favoritos do localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);

    // Buscar detalhes da magia
    fetchSpellDetails(spellIndex).then(setSpell);
  }, [spellIndex]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleFavoriteClick = () => {
    if (spell) {
      setFavorites(prevFavorites => {
        const isFavorite = prevFavorites.some(fav => fav.index === spell.index);
        let updatedFavorites;
        if (isFavorite) {
          updatedFavorites = prevFavorites.filter(fav => fav.index !== spell.index);
        } else {
          updatedFavorites = [...prevFavorites, spell];
        }
        // Atualizar o localStorage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    }
  };

  if (!spell) return <Spinner />;

  return (
    <div className="spell-details-wrapper">
      <div className="spell-details-container">
        <div className="spell-details-header">
          <h2 className="spell-name">
            {spell.name}
            {spell.level === 0 && <img src={cantripIcon} alt="Cantrip Icon" className="spell-details-icon" />}
            {spell.ritual && <img src={ritualIcon} alt="Ritual Icon" className="spell-details-icon" />}
          </h2>
          <p className="spell-type">{spell.school?.name}</p>
        </div>
        <div className="spell-details-content">
          <p><strong>Tempo de Conjuração:</strong> {spell.casting_time || 'Desconhecido'}</p>
          <p><strong>Alcance/Área:</strong> {spell.range || 'Desconhecido'}</p>
          <p><strong>Duração:</strong> {spell.duration || 'Desconhecido'}</p>
          <p><strong>Componentes:</strong> {spell.components?.join(', ') || 'N/A'}</p>
          <p><strong>Descrição:</strong> {spell.desc?.join(' ') || 'Sem descrição disponível.'}</p>
          {spell.higher_level && <p><strong>Em Níveis Superiores:</strong> {spell.higher_level.join(' ')}</p>}
        </div>
        <div className="spell-details-footer">
          <p><strong>Classes:</strong> {spell.classes ? spell.classes.map(c => c.name).join(', ') : 'N/A'}</p>
        </div>
      </div>
      <div className="spell-details-buttons">
        <button onClick={handleBackClick} className="btn btn-back">
          Voltar para Home
        </button>
        <button onClick={handleFavoriteClick} className="btn btn-favorite">
          {favorites.some(fav => fav.index === spell.index) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </button>
      </div>
    </div>
  );
};

export default SpellDetails;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/spellFavorite.scss';
import cantripIcon from '../assets/cantrip-icon.svg';
import ritualIcon from '../assets/ritual-icon.svg';

const Favorites = () => {
  const [favorites, setFavorites] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleCardClick = (index) => {
    navigate(`/spell/${index}`);
  };

  const handleRemoveFavorite = (index) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((spell) => spell.index !== index);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div className="spell-container">
      <h1>Favoritos</h1>
      <div className="spell-grid">
        {favorites.length === 0 ? (
          <p className="no-results-message">Você ainda não tem magias favoritas.</p>
        ) : (
          favorites.map((spell) => (
            <div
              key={spell.index}
              className="spell-card"
              onClick={() => handleCardClick(spell.index)}
            >
              <div className="spell-header">
                <h2 className="spell-name">
                  {spell.name}
                  {spell.level === 0 && <img src={cantripIcon} alt="Cantrip Icon" className="spell-icon" />}
                  {spell.ritual && <img src={ritualIcon} alt="Ritual Icon" className="spell-icon" />}
                </h2>
                <p className="spell-type">{spell.school?.name}</p>
              </div>
              <button
                className="btn btn-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFavorite(spell.index);
                }}
              >
                Remover dos Favoritos
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;

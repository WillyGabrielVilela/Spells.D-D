import { useNavigate } from 'react-router-dom';
import '../styles/home.scss';
import adventureImage from '../assets/adventure_dd.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/spells');
  };

  return (
    <div className="home">
      <main className="home-main">
        <img src={adventureImage} alt="Adventure" className="home-image" />
        <p className="home-text">
          Embarque em aventuras épicas com Dungeons & Dragons! Descubra magias, explore mundos fantásticos e desafie criaturas lendárias.
        </p>
        <button className="home-button" onClick={handleButtonClick}>Começar Aventura</button>
      </main>
    </div>
  );
};

export default Home;

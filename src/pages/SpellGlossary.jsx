import '../styles/glossary.scss';
import cantripIcon from '../assets/cantrip-icon.svg';
import ritualIcon from '../assets/ritual-icon.svg';

const SpellsInfo = () => {
  return (
    <div className="spells-info-container">
      <h1>Informações sobre Magias</h1>
      <section className="spells-info-section">
        <h2>O que são Cantrips?</h2>
        <img src={cantripIcon} alt="Cantrip Icon" className="cantrip-icon" />
        <p>
          Cantrips são magias que os personagens podem conjurar sem gastar recursos adicionais. Eles são geralmente menos poderosos do que outras magias e podem ser usados repetidamente sem limites. Na maioria das campanhas de Dungeons & Dragons, os cantrips são mágicas menores, porém úteis, que podem ser lançadas sem preocupação com slots de magia.
        </p>
      </section>

      <section className="spells-info-section">
        <h2>O que são Magias de Ritual?</h2>
        <img src={ritualIcon} alt="Ritual Icon" className="ritual-icon" />
        <p>
          Magias de Ritual são feitiços que podem ser conjurados sem consumir um slot de magia, desde que o conjurador esteja disposto a gastar um tempo adicional para realizar o ritual. As magias de ritual são úteis para quando você precisa de um feitiço específico e pode dedicar mais tempo para realizá-lo. Em geral, esses feitiços são mais poderosos ou complexos e oferecem flexibilidade adicional durante as aventuras.
        </p>
      </section>

      <section className="spells-info-section">
        <h2>Outros Termos Importantes</h2>
        <ul>
          <li><strong>Tempo de Conjuração:</strong> O período necessário para lançar a magia. Pode variar de uma ação rápida a um longo período.</li>
          <li><strong>Alcance/Área:</strong> A distância até a qual a magia pode atingir seu alvo ou a área coberta pela magia.</li>
          <li><strong>Duração:</strong> O tempo durante o qual a magia permanece ativa ou seus efeitos duram.</li>
          <li><strong>Componentes:</strong> Os materiais necessários para lançar a magia, incluindo gestos, palavras e itens materiais.</li>
          <li><strong>Classes:</strong> As classes de personagem que podem aprender e lançar a magia.</li>
        </ul>
      </section>
    </div>
  );
};

export default SpellsInfo;

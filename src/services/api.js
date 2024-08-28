const API_URL = 'https://www.dnd5eapi.co/api';

export const fetchSpells = async () => {
  const response = await fetch(`${API_URL}/spells`);
  const data = await response.json();
  return {
    results: data.results || [], // Retorna apenas a lista de feitiços
    count: data.count // Adiciona a contagem total
  };
};

export const fetchSpellDetails = async (spellIndex) => {
  try {
    const response = await fetch(`${API_URL}/spells/${spellIndex}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching spell details:', error);
    throw error;
  }
};


export const fetchClasses = async () => {
  try {
    const response = await fetch(`${API_URL}/classes`);
    const data = await response.json();
    console.log('Classes Data:', data); // Adicione este log
    return data.results || []; // Retorna apenas a lista de classes
  } catch (error) {
    console.error('Erro ao buscar classes:', error);
    throw error; // Propaga o erro para ser tratado no componente
  }
};

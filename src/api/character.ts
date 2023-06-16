import axios from 'axios';

const rickyMortyApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
  timeout: 1000,
});

export const getCharacterList = async (page?: number, name?: string) => {
  try {
    const data = await rickyMortyApi
      .get(`/character`, {
        params: {
          page: page || 1,
          name,
        },
      })
      .then((res) => res.data);
    return data;
  } catch (e) {
    console.error(e);
  }
  return { results: [], info: {} };
};

export const getCharacter = async (id: string) => {
  try {
    const data = await rickyMortyApi
      .get(`/character/${id}`)
      .then((res) => res.data);

    return data;
  } catch (e) {
    console.error(e);
  }
  return {};
};

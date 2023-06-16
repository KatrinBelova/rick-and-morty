import axiosInstance from 'libs/axios';

export const getCharacterList = (page?: number) => {
  return axiosInstance.get(`/character?page=${page || 1}`);
};

export const getSingleCharacter = (id: string) => {
  return axiosInstance.get(`/character/${id}`);
};

export const filterCharacter = (name: string, page?: number) => {
  return axiosInstance.get(`/character/?page=${page || 1}?name=${name}`);
};

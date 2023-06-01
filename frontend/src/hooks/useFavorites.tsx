import React, { useState } from 'react';
import clientHTTP from '../api/configAxios';
import { TypeFavorites } from '../interfaces/interfacesEndPoints';

export const useFavorites = () => {

  const [favorites, setFavorites] = useState<TypeFavorites[]>([]);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState<boolean>(false);

  const getFavorites = async (email: string | undefined) => {
    try {
      setIsLoadingFavorite(true);
      const res = await clientHTTP.get(`/favorites?email=${email}`);
      setFavorites(res.data);
      setIsLoadingFavorite(false);
      return res.data;
    } catch (error) {
      setIsLoadingFavorite(false);
      console.log(error);
    }
  }

  const deleteFavorite = async (id_idea: number) => {
    try {
      const res = await clientHTTP.delete(`/favorites?id_idea=${id_idea}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const addFavorite = async (email: string | undefined, id_idea: number) => {
    try {
      await clientHTTP.post(`/favorites`, { id_idea, email });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getFavorites,
    addFavorite,
    deleteFavorite,
    favorites,
    isLoadingFavorite
  }
}

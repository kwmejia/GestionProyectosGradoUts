import { useState } from 'react';
import { TypeStateIdeas } from '../interfaces/interfacesEndPoints';
import clienteHTTP from '../api/configAxios';

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<TypeStateIdeas[]>([]);
  const [ideasFavorites, setIdeasFavorites] = useState<TypeStateIdeas[]>([])
  const [loader, setLoader] = useState<boolean>(true);
  const [loaderIdeasFavorites, setLoaderIdeasFavorites] = useState<boolean>(true);

  const getIdeas = async (email: string | undefined, checkDe: boolean = true, checkIn: boolean = true) => {

    try {
      const response = await clienteHTTP.get(`/obtenerIdeas?correo=${email}&checkDe=${checkDe}&checkIn=${checkIn}`);
      setIdeas(response.data.result);
      setLoader(false);
      return response.data.result;
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  }


  const getIdeasFavorites = async (email: string | undefined) => {
    try {
      setLoaderIdeasFavorites(true);
      const response = await clienteHTTP.get(`/obtenerIdeasFavoritas?correo=${email}`);
      setIdeasFavorites(response.data);
      setLoaderIdeasFavorites(false);
      return response.data;
    } catch (error) {
      setLoaderIdeasFavorites(false)
      console.log(error);
    }
  }

  return {
    ideas,
    loader,
    getIdeas,
    getIdeasFavorites,
    ideasFavorites,
    loaderIdeasFavorites
  };
}

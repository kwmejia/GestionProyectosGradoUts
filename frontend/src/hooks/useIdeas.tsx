import { useState } from 'react';
import { TypeStateIdeas } from '../interfaces/interfacesEndPoints';
import clienteHTTP from '../api/configAxios';

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<TypeStateIdeas[]>([]);
  const [ideasFavorites, setIdeasFavorites] = useState<TypeStateIdeas[]>([])
  const [loader, setLoader] = useState<boolean>(false);

  const getIdeas = async (email: string | undefined, checkDe: boolean = true, checkIn: boolean = true) => {

    try {
      setLoader(true);
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
      setLoader(true);
      const response = await clienteHTTP.get(`/obtenerIdeasFavoritas?correo=${email}`);
      console.log(response)
      setIdeasFavorites(response.data);
      setLoader(false);
      return response.data;
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  }

  return {
    ideas,
    loader,
    getIdeas,
    getIdeasFavorites,
    ideasFavorites
  };
}

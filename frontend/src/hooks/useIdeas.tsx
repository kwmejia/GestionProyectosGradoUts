import { useState } from 'react';
import { TypeStateIdeas } from '../interfaces/interfacesEndPoints';
import clienteHTTP from '../api/configAxios';

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<TypeStateIdeas[]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  const getIdeas = async (email: string | undefined, checkDe: boolean = true, checkIn: boolean = true) => {

    try {
      const response = await clienteHTTP.get(`/obtenerIdeas?correo=${email}&checkDe=${checkDe}&checkIn=${checkIn}`);
      setIdeas(response.data.result);
      setLoader(false);
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  }

  return {
    ideas,
    loader,
    getIdeas
  };
}

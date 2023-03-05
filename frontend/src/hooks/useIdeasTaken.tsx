import React from 'react'
import clientHTTP from '../api/configAxios';
import { useState } from 'react';
import { TypeIdeasTaken } from '../interfaces/interfacesEndPoints';


export interface paramsIdeaTaken {
  state: number;
  cooldown: string | null;
  email: string | undefined;
  idIdea: number | undefined;
  date: string;
}

export const useIdeasTaken = () => {

  const [ideaTaken, setIdeaTaken] = useState<TypeIdeasTaken[]>([]);
  const [isLoadingIdeasTaken, setisLoadingIdeasTaken] = useState<boolean>(false);

  const insertIdeaTaken = async (idea: paramsIdeaTaken) => {
    try {
      const res = await clientHTTP.post('/postIdeaTomada', {
        estado: idea.state,
        cooldown: idea.cooldown,
        correo: idea.email,
        idIdea: idea.idIdea,
        fechaAceptado: idea.date
      });
    } catch (error) {
      console.log(error);
    }
  }

  const getIdeaTakenById = async (id: number) => {
    setisLoadingIdeasTaken(true);
    try {
      const res = await clientHTTP.get(`/getIdeaTomadaId?id=${id}`);
      setIdeaTaken(res.data);
      setisLoadingIdeasTaken(false);
      return res.data;

    } catch (error) {
      setisLoadingIdeasTaken(false);
      console.log(error);
    }
  }

  return {
    insertIdeaTaken,
    getIdeaTakenById,
    isLoadingIdeasTaken,
    ideaTaken
  }
}

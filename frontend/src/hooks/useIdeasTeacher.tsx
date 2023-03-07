import clientHTTP from "../api/configAxios"
import { useState } from 'react';
import { TypeIdeasTeacher } from "../interfaces/interfacesEndPoints";

export const useIdeasTeacher = () => {

  const [ideasTeacher, setIdeasTeacher] = useState<TypeIdeasTeacher[]>([]);

  const getIdeasTeacher = async (email: string | undefined) => {
    try {
      const res = await clientHTTP.get(`/ideasProfesor?email=${email}`);
      setIdeasTeacher(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const postIdeasTeacher = async (title: string, email: string | undefined, type: string, description: string) => {

    try {
      const res = await clientHTTP.post(`/ideasProfesor`, {
        title,
        email,
        type,
        approved: 0,
        take: 0,
        description
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteIdeaTeacher = async (id: number) => {
    try {
      const res = await clientHTTP.delete(`/ideasProfesor?id=${id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getIdeasTeacher,
    ideasTeacher,
    postIdeasTeacher,
    deleteIdeaTeacher
  }
}

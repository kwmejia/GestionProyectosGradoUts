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

  const getIdeaTeacherById = async (id: number | undefined, email: string | undefined) => {
    try {
      const { data } = await clientHTTP.get(`/ideasProfesor/${id}?email=${email}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const postIdeasTeacher = async (title: string, email: string | undefined, type: string, description: string) => {

    try {
      await clientHTTP.post(`/ideasProfesor`, {
        title,
        email,
        type,
        approved: 0,
        take: 0,
        description
      });
    } catch (error) {
      console.log(error);
    }
  }

  const deleteIdeaTeacher = async (id: number) => {
    try {
      await clientHTTP.delete(`/ideasProfesor?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  const updateIdeaTeacher = async (id: number | undefined, title: string, type: string, description: string) => {
    try {
      await clientHTTP.put(`/ideasProfesor`, {
        id,
        title,
        type,
        description
      });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getIdeasTeacher,
    ideasTeacher,
    postIdeasTeacher,
    deleteIdeaTeacher,
    updateIdeaTeacher,
    getIdeaTeacherById
  }
}

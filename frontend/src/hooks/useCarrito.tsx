import { useState } from 'react';
import { TypeCarrito } from '../interfaces/interfacesEndPoints';
import clienteHTTP from '../api/configAxios';

export const useCarrito = () => {
  const [carrito, setCarrito] = useState<TypeCarrito[]>([]);
  const [loaderCarrito, setLoaderCarrito] = useState<boolean>(true);

  const getCarrito = async (email: string | undefined) => {
    try {
      const res = await clienteHTTP.get(`/cart?email=${email}`);
      setCarrito(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const addCarrito = async (email: string | undefined, id_idea: number) => {
    try {
      const res = await clienteHTTP.post('/cart', { email, id_idea });
      if (!res?.data.error) {
        await clienteHTTP.put(`/addCarritoIdea?id=${id_idea}`);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCarrito = async (email: string | undefined, id_idea: number) => {
    try {
      await clienteHTTP.delete(`/cart?correo=${email}&id=${id_idea}`);
      await clienteHTTP.put(`/deleteCarritoIdea?id=${id_idea}`);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    carrito,
    loaderCarrito,
    setLoaderCarrito,
    getCarrito,
    addCarrito,
    deleteCarrito
  };
}

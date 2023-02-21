import { createContext, useEffect, useState } from 'react';
import { isExpired } from 'react-jwt';
import AzureGraphServices from '../config/AzureGraphServices';
import { AppUser, AuthContextProps, AuthProviderProps } from '../interfaces/interfacesAuthContext';


export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<AppUser | undefined>(undefined);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {

    const token = localStorage.getItem('accessToken');
    if (token) {
      // const myDecodedToken = decodeToken(token!);
      const isMyTokenExpired = isExpired(token!);
      if (isMyTokenExpired) {
        logOut();
        return;
      }
      loadInfo();
    }
  }

  const loadInfo = async () => {
    setIsLogged(true);

    try {
      const promises = await Promise.all([
        await AzureGraphServices.getUser(),
        await AzureGraphServices.getPhoto(),
      ]);

      const [userRes, photo] = promises;

      setUser({
        displayName: userRes.displayName || '',
        email: userRes.mail || userRes.userPrincipalName || '',
        // email: res ? "ADMINISTRADOR" : userRes.mail || userRes.userPrincipalName || '',
        rol: userRes.jobTitle || '',
        avatar: photo
      });
    } catch (error) {
      console.error(error);
    }
  }

  const logIn = async () => {
    try {
      const token = await AzureGraphServices.getAccestToken();
      localStorage.setItem('accessToken', token);
      loadInfo();

    } catch (error) {
      setIsLogged(false);
    }
  };

  const logOut = async () => {
    localStorage.clear();
    setUser(undefined);
    sessionStorage.clear();
    setIsLogged(false);

  };
  console.log(user);

  return (
    <AuthContext.Provider value={{
      logIn,
      logOut,
      isLogged,
      user
    }} >
      {children}
    </AuthContext.Provider>
  )
}

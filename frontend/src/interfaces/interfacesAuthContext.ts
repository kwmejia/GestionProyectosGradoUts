
export interface AuthContextProps {
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
  isLogged: boolean;
  user: AppUser | undefined;
}

export interface AppUser {
  displayName: string;
  email: string;
  rol: string;
  avatar: any;
}

export interface AuthProviderProps {
  children: JSX.Element | JSX.Element[]
}
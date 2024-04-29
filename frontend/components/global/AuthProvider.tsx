import { useState, createContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { TokenPayload } from 'schemas/AuthSchema';

export interface AuthContextProps {
   user: TokenPayload,
   setUser: Dispatch<SetStateAction<TokenPayload>>
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<TokenPayload>(null);

   useEffect(() => {
      if(!user) {
         const userFromLS = localStorage.getItem("user");
         const userForState = !!userFromLS ? JSON.parse(userFromLS) : null;
         setUser(userForState);
      }
   }, [])

   return (
      <AuthContext.Provider value={{
         user,
         setUser
      }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider
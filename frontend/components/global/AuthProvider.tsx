import { useState, createContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { TokenPayload } from 'schemas/AuthSchema';

interface AuthContextProps {
   user: TokenPayload,
   setUser: Dispatch<SetStateAction<TokenPayload>>
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
   const [user, setUser] = useState<TokenPayload>(null);
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
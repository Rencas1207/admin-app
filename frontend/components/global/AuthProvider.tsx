import { Container, Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, createContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { TokenPayload } from 'schemas/AuthSchema';

export interface AuthContextProps {
   user: TokenPayload,
   setUser: Dispatch<SetStateAction<TokenPayload>>
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const router = useRouter();
   const PROTECTED_ROUTES = ["/"]
   const [user, setUser] = useState<TokenPayload>(null);
   const [validating, setValidating] = useState(true);

   const validateRoutes = (user: TokenPayload) => {
      if(!user && PROTECTED_ROUTES.includes(router.pathname)) {
         router.push("/login");
      }
      if(!!user && router.pathname === '/login') {
         router.push("/")
      }
      setTimeout(() => {
         setValidating(false);
      }, 5000);
   }

   useEffect(() => {
      if(!user) {
         const userFromLS = localStorage.getItem("user");
         const userForState = !!userFromLS ? JSON.parse(userFromLS) : null;
         setUser(userForState);
         validateRoutes(userForState)
      }
   }, [])
   
   if(validating) return (
      <Flex width="100vw" height="100vh" alignItems="center">
         <Spinner colorScheme='purple' width="5rem" height="5rem" />
      </Flex>
   )
   
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
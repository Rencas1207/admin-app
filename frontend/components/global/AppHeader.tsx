import { useRouter } from 'next/router'
import { Avatar, Button, Flex } from '@chakra-ui/react'
import useAuth from 'hooks/useAuth';

const AppHeader = () => {
   const { user } = useAuth();
   const router = useRouter();
   return (
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
         <Avatar src="/logo.png" w={16} h={16} />
         {!user && (
            <Button mb={4} colorScheme='blue' onClick={() => {
               router.push('/login')
            }}>
            Iniciar sesión
            </Button>
         )}
         {!!user && (
            <Flex gap={4} alignItems="center">
               <Avatar src={user.imageUrl} w={16} h={16} />
               <Button size="sm" colorScheme='red' onClick={() => {
                  localStorage.removeItem('user')
                  document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                  router.push('/login')
               }}>
               Cerrar sesión
               </Button>
            </Flex> 
         )}
      </Flex>
   )
}

export default AppHeader
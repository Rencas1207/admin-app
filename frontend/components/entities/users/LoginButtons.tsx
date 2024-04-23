import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react';
import axios from 'axios';
import { useFormContext } from 'react-hook-form';
import { env } from '~/env';

const LoginButtons = () => {
   const { getValues } = useFormContext();
   return (
      <ButtonGroup marginTop={8} justifyContent="space-between" w="100%">
         <Button type='submit' colorScheme='blue'>Iniciar sesión</Button>
         <Button colorScheme='blue' onClick={() => {
            const email = getValues('email');
            axios.post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}/code`)
         }}>
            Quiero un código
         </Button>
      </ButtonGroup>
  )
}

export default LoginButtons
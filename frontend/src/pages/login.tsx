import { NextPage } from 'next'
import { Container, FormControl, FormHelperText, FormLabel, Heading, Input, Card, Button, ButtonGroup } from '@chakra-ui/react'

const Login: NextPage = () => {
  return (
    <Container marginTop={10} >
      <Card padding={3}>
         <Heading textAlign="center">Iniciar sesión</Heading>
         <form>
            <FormControl marginBottom={5}>
               <FormLabel>Email</FormLabel>
               <Input type='text' placeholder='Ingresa tu email' />
            </FormControl>
            <FormControl>
               <FormLabel>Código</FormLabel>
               <Input type='text' placeholder='Ingresa tu código' />
            </FormControl>
            <ButtonGroup marginTop={8} justifyContent="space-between" w="100%">
               <Button colorScheme='blue'>Iniciar sesión</Button>
               <Button colorScheme='blue'>Quiero un código</Button>
            </ButtonGroup>
         </form>
      </Card>
    </Container>
  )
}

export default Login
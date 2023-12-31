import { NextPage } from 'next'
import { Card, Container, Heading } from '@chakra-ui/react'
import ClientForm from 'components/entities/clients/ClientForm';

const NewClient: NextPage = () => {

  return (
    <Container marginTop={8}>
      <Card padding={4}>
         <Heading textAlign="center" marginBottom={6}>Nuevo cliente</Heading>
         <ClientForm />        
      </Card>
    </Container>
  )
}

export default NewClient
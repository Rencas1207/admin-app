import { NextPage } from 'next'
import { Card, Container, Heading } from '@chakra-ui/react'
import SaleForm from 'components/entities/sales/SaleForm';

const NewClient: NextPage = () => {

  return (
    <Container marginTop={8}>
      <Card padding={4}>
         <Heading textAlign="center" marginBottom={6}>Nueva Venta</Heading>
         <SaleForm />        
      </Card>
    </Container>
  )
}

export default NewClient
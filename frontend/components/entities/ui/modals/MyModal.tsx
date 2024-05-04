import { ReactNode } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Button } from '@chakra-ui/react'

interface Props {
   title: string;
   children: ReactNode;
}

const MyModal = ({title, children}: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button colorScheme='purple' onClick={onOpen}>
         Nuevo cliente
      </Button> 
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MyModal
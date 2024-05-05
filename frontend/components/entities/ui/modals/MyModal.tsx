import { ReactNode } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Button } from '@chakra-ui/react'

interface Props {
   title: string;
   children: ReactNode;
   buttonText?: string;
   buttonColor?: string;
   buttonSize?: "xs" | "md";
}

const MyModal = ({title, children, buttonText, buttonSize = "md", buttonColor = "purple" }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button size={buttonSize} colorScheme={buttonColor} onClick={onOpen}>
         {buttonText || title}
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
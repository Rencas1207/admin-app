import { ReactElement } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Button } from '@chakra-ui/react'
import { Sizes } from 'schemas/UiSchemas';

interface Props {
   title: string;
   children: (props: { onClose: () => void }) => ReactElement;
   buttonText?: string;
   buttonColor?: string;
   buttonSize?: Sizes;
   mr?: number;
   disableButton?: boolean
}

const MyModal = ({ 
  title, 
  children, 
  buttonText, 
  buttonSize = "md", 
  buttonColor = "purple", 
  disableButton,
  mr = 0 
}: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button 
        size={buttonSize} 
        colorScheme={buttonColor} 
        mr={mr} 
        onClick={onOpen} 
        isDisabled={disableButton}
      >
         {buttonText || title}
      </Button> 
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children({ onClose })}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MyModal
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { api } from "../../services/api";

interface ModalDeleteProps {
  nameDelete: string;
  typeDelete: string;
  url: string;
  id: string;
}

export function DeleteModal({
  nameDelete,
  typeDelete,
  url,
  id,
}: ModalDeleteProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteUser = async () => {
    await api.delete(`${url}/${id}`);
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.600">Confirmar Exclusão</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} color="gray.600">
            <Flex>`Tem Certeza que deseja excluir ${typeDelete}`</Flex> <br />
            <Flex>`De ${nameDelete}`</Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleDeleteUser()}>
              Exluir
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

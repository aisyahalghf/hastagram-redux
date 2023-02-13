import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";

const CardEditCaption = ({ handleSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const caption = useRef();
  const finalRef = useRef(null);

  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        colorScheme="gray"
        aria-label="See menu"
        fontSize="15px"
        h="fit-content"
        p="7px"
      >
        Edit
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Captions </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Captions</FormLabel>
              <Input ref={caption} placeholder="Write Caption" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={(e) => handleSave(caption.current.value)}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardEditCaption;

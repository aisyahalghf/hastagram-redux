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
  Image,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

const CardEditProfile = ({ datas, handleSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fullname = useRef();
  const bio = useRef();
  const images = useRef();
  const username = useRef();
  const finalRef = useRef(null);
  let [addFile, setAddFile] = useState("");

  const onBtnAddFile = (e) => {
    if (e.target.files[0]) {
      setAddFile(e.target.files[0]);
      let preview = document.getElementById("imgprev");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  return (
    <>
      <Button onClick={onOpen} fontSize="15px" h="fit-content" p="7px">
        Edit Profile
        <Icon icon="arcticons:settings" />
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Image m="0 auto" id="imgprev" w="100px" rounded="40%" />

            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                ref={username}
                placeholder={datas?.username}
                defaultValue={datas?.username}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Full Name</FormLabel>
              <Input
                ref={fullname}
                placeholder={datas?.fullname}
                defaultValue={datas?.fullname}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input defaultValue={datas?.email} disabled="disable" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Input
                ref={bio}
                placeholder={datas?.bio}
                defaultValue={datas?.bio}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Photo Profile</FormLabel>
              <Input
                type="file"
                ref={images}
                name="images"
                id="images"
                onChange={onBtnAddFile}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={(e) =>
                handleSave({
                  fullname: fullname.current.value,
                  bio: bio.current.value,
                  username: username.current.value,
                  addFile: addFile,
                })
              }
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

export default CardEditProfile;

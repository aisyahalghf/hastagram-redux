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
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const CreateProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fullname = useRef();
  const bio = useRef();
  const images = useRef();
  const finalRef = useRef(null);
  let [addFile, setAddFile] = useState("");
  let [data, setData] = useState({});

  const onBtnAddFile = (e) => {
    if (e.target.files[0]) {
      setAddFile(e.target.files[0]);
      let preview = document.getElementById("imgprev");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      let inputFullname = fullname.current.value;
      let inputBio = bio.current.value;

      if (addFile) {
        let formData = new FormData();
        let getStorage = localStorage.my_Token;

        formData.append("images", addFile);
        let getData = await axios.post(
          `http://localhost:4000/user-profile/info?fullname=${inputFullname}&bio=${inputBio}`,
          formData,
          {
            headers: {
              Authorization: `${getStorage}`,
            },
          }
        );
        setData(getData.data.data);
        toast(getData.data.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);

  return (
    <>
      <Button onClick={onOpen} fontSize="12px" h="fit-content" p="5px">
        complite profile
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Complite Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Image m="0 auto" id="imgprev" w="100px" rounded="70px" />
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input ref={fullname} placeholder="Full Name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Input ref={bio} placeholder="Bio" />
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
            <Button onClick={handleSave} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toaster />
    </>
  );
};

export default CreateProfile;

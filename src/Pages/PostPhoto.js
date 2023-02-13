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

const PostPhoto = ({ getAllContent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const images = useRef();
  const caption = useRef();
  const finalRef = useRef(null);
  let [addFile, setAddFile] = useState("");

  const onBtnAddFile = (e) => {
    if (e.target.files[0]) {
      setAddFile(e.target.files[0]);
      let preview = document.getElementById("imgprev");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      let inputCaption = caption.current.value;
      let getStorage = localStorage.my_Token;

      if (addFile) {
        console.log("haloo1");
        let formData = new FormData();
        formData.append("images", addFile);
        console.log(formData);
        let getData = await axios.post(
          `http://localhost:4000/content/create-content?caption=${inputCaption}`,
          formData,
          {
            headers: {
              Authorization: `${getStorage}`,
            },
          }
        );
        console.log(getData);
        toast(getData.data.message);
        getAllContent();
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    }
  };

  return (
    <>
      <div onClick={onOpen}>Create</div>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Create Content </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Image m="0 auto" id="imgprev" w="100%" />

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                ref={images}
                name="images"
                id="images"
                onChange={onBtnAddFile}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Caption</FormLabel>
              <Input ref={caption} placeholder="write your caption" />
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

export default PostPhoto;

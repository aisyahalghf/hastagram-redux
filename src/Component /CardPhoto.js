import {
  Card,
  CardHeader,
  Box,
  Heading,
  Text,
  IconButton,
  CardBody,
  Image,
  CardFooter,
  Flex,
  Avatar,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect } from "react";
import { useRef, useState } from "react";
import CardComment from "./CardComment";
import { Toaster, toast } from "react-hot-toast";

const CardPhoto = (props) => {
  let comment = useRef();
  let [getComment, setGetComment] = useState([]);

  const date = () => {
    const currentDate = new Date();
    const lastPost = new Date(props.create);
    const differenceInTime = currentDate.getTime() - lastPost.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.floor(differenceInDays);
  };

  const getDataComment = async () => {
    try {
      let data = await axios.get(
        `http://localhost:4000/comment/all-comment?id_content=${props.id}`
      );
      setGetComment(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showDataComment = () => {
    if (getComment.length >= 5) {
      getComment = getComment.slice(0, 5);
    }
    return getComment.map((val, idx) => {
      return (
        <div key={idx.toLocaleString()}>
          <CardComment
            images={"http://localhost:4000" + val?.profile_picture?.slice(6)}
            username={val?.username}
            comment={val?.comment}
          />
        </div>
      );
    });
  };

  const handleSaveComment = async (event) => {
    try {
      let getStorage = localStorage.my_Token;
      if (getStorage) {
        let inputComment = event.value;
        await axios.post(
          `http://localhost:4000/comment/create-comment/${event.id}`,
          {
            comment: inputComment,
          },
          {
            headers: {
              Authorization: getStorage,
            },
          }
        );
        toast("comment sent");
        getDataComment();
        comment.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLove = async (e) => {
    console.log(e);
    console.log("hallo");
  };

  useEffect(() => {
    date();
    getDataComment();
  }, []);

  return (
    <Card maxW="xl" borderBottom="1px">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={props.name} src={props.photo_profile} />

            <Box>
              <Heading size="sm">{props.name}</Heading>
              <Text>{props.bio}</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
          />
        </Flex>
      </CardHeader>
      <Image
        objectFit="cover"
        src={props.image}
        alt="Chakra UI"
        h="auto"
        w="100%"
      />

      <div className="flex gap-5 m-4 ">
        <div onClick={() => handleLove(true)}>
          <Icon className=" text-3xl " icon="ph:heart-straight-fill" />
        </div>
        <Icon className=" text-3xl " icon="akar-icons:comment" />
        <Icon className=" text-3xl " icon="ion:paper-plane-outline" />
      </div>
      <Text ml={4}>{props.likes} Likes</Text>
      <CardBody>
        <Text>{props.captions}</Text>
      </CardBody>

      <div className="flex flex-col gap-2 ml-2 mr-2 ">
        <div className=" text-xs ml-3  text-slate-400  ">Latest Comment</div>
        <div> {showDataComment()}</div>

        <FormControl>
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveComment({
                  value: comment.current.value,
                  id: props.id,
                });
              }
            }}
            ref={comment}
            placeholder="write comment"
          />
        </FormControl>
      </div>

      <CardFooter>
        {date() === 0 ? (
          <div className=" text-slate-400  text-xs"> a day </div>
        ) : (
          <div className=" text-slate-400  text-xs"> {date()} days ago </div>
        )}
      </CardFooter>
      <Toaster />
    </Card>
  );
};

export default CardPhoto;

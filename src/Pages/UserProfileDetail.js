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
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Icon } from "@iconify/react";
import CardEditCaption from "../Component /CardEditCaption";
import CardComment from "../Component /CardComment";
import { userAlbum } from "../redux/action/userContent";
import { useDispatch } from "react-redux";

const UsersProfileDetail = () => {
  const { id } = useParams();
  let [data, setData] = useState({});
  let navigate = useNavigate();
  let [comment, setComment] = useState([]);
  let userComment = useRef();
  let dispatch = useDispatch();

  const singleContent = async () => {
    try {
      let getData = await axios.get(
        `http://localhost:4000/content/content-params/${id}`
      );
      setData(getData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getComment = async () => {
    try {
      let getDataComment = await axios.get(
        `http://localhost:4000/comment/all-comment?id_content=${id}`
      );
      if (getDataComment.data.data.length >= 5) {
        setComment(getDataComment.data.data.slice(0, 5));
      } else {
        setComment(getDataComment.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const date = () => {
    const currentDate = new Date();
    const lastPost = new Date(data?.create_at?.slice(0, 10));
    const differenceInTime = currentDate.getTime() - lastPost.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.floor(differenceInDays);
  };

  useEffect(() => {
    singleContent();
    date();
    getComment();
  }, []);

  const handleDelete = async () => {
    try {
      let data = await axios.delete(
        `http://localhost:4000/content/remove-content/${id}`
      );
      toast(data.data.message);
      dispatch(userAlbum());
      navigate("/profile");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSaveComment = async () => {
    try {
      let getStorage = localStorage.my_Token;
      if (getStorage) {
        let inputComment = userComment.current.value;
        await axios.post(
          `http://localhost:4000/comment/create-comment/${id}`,
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
        getComment();
        userComment.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (event) => {
    try {
      let newCaption = event;
      let getStorage = localStorage.my_Token;
      let data = await axios.patch(
        `http://localhost:4000/content/edit/${id}`,
        { caption: newCaption },
        {
          headers: {
            Authorization: getStorage,
          },
        }
      );

      toast(data.data.message);
      singleContent();
      onclose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-row justify-center gap-60 container mx-auto mt-20  ">
      <div className=" flex flex-col justify-center  text-center font-bold text-2xl text-slate-400">
        Detail Picture
      </div>

      <div className=" w-[60%]">
        <Card maxW="xl" borderBottom="1px">
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  name={data?.username}
                  src={`http://localhost:4000${data?.profile_picture?.slice(
                    6
                  )}`}
                />
                <Box>
                  <Heading size="sm">{data?.username}</Heading>
                  <Text>{data?.bio}</Text>
                </Box>
              </Flex>
              <Button
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                fontSize="15px"
                h="fit-content"
                p="7px"
                onClick={handleDelete}
              >
                Delete
              </Button>

              <CardEditCaption handleSave={handleSave} />

              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
              />
            </Flex>
          </CardHeader>
          <Image
            objectFit="cover"
            src={`http://localhost:4000${data?.images?.slice(6)}`}
            alt="Chakra UI"
            h="auto"
            w="100%"
          />

          <div className="flex gap-5 m-4 ">
            <Icon className=" text-3xl " icon="ph:heart-straight-fill" />
            <Icon className=" text-3xl " icon="akar-icons:comment" />
            <Icon className=" text-3xl " icon="ion:paper-plane-outline" />
          </div>
          <Text ml={4}>{data?.likes} Likes</Text>
          <CardBody>
            <Text>{data?.caption}</Text>
          </CardBody>

          <div className="flex flex-col gap-2 ml-2 mr-2 ">
            <div className=" text-xs ml-3  text-slate-400  ">
              Latest Comment
            </div>

            {comment.map((val, idx) => {
              return (
                <div key={idx.toLocaleString()}>
                  <CardComment
                    images={
                      "http://localhost:4000" + val?.profile_picture?.slice(6)
                    }
                    username={val?.username}
                    comment={val?.comment}
                  />
                </div>
              );
            })}

            <FormControl>
              <Input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveComment();
                  }
                }}
                ref={userComment}
                placeholder="write comment"
              />
            </FormControl>
          </div>

          <CardFooter>
            {date() === 0 ? (
              <div className=" text-slate-400  text-xs"> a day </div>
            ) : (
              <div className=" text-slate-400  text-xs">{date()} days ago </div>
            )}
          </CardFooter>
          <Toaster />
        </Card>
      </div>
    </div>
  );
};

export default UsersProfileDetail;

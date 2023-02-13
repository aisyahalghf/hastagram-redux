import { Avatar, Heading } from "@chakra-ui/react";

const CardComment = (props) => {
  return (
    <div className=" flex flex-row gap-5 border border-slate-200 shadow shadow-slate-200 p-1 rounded-[20px] ">
      <Avatar w="30px" h="30px" name="Segun Adebayo" src={props.images} />
      <div className=" flex flex-col gap-1">
        <Heading size="xs">{props.username}</Heading>
        <div className=" text-xs ">{props.comment}</div>
      </div>
    </div>
  );
};
export default CardComment;

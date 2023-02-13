import { Card, Image, CardFooter } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

const CardOwnLibrary = (props) => {
  const date = () => {
    const currentDate = new Date();
    const lastPost = new Date(props.create);
    const differenceInTime = currentDate.getTime() - lastPost.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.floor(differenceInDays);
  };

  useEffect(() => {
    date();
  }, []);

  return (
    <Card maxW="xl">
      <Icon icon="game-icons:settings-knobs " />
      <div className=" overflow-hidden h-[300px] flex flex-col justify-center ">
        <Image
          objectFit="cover"
          src={props.image}
          alt="Chakra UI"
          h="auto"
          w="100%"
        />
      </div>

      <CardFooter>
        {date() === 0 ? (
          <div className=" text-slate-400  text-xs"> a day </div>
        ) : (
          <div className=" text-slate-400  text-xs"> {date()} days ago </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardOwnLibrary;

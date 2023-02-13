import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardBeforeLogin = () => {
  return (
    <div className=" flex flex-col gap-3 p-4 border border-slate-200 rounded-[20px] w-[350px] mt-5">
      <h1 className=" font-bold ">New to Hashtagram</h1>
      <p className=" text-sm ">
        Sign up now to get your own personalized timeline!
      </p>
      <Link to="/login">
        <Button rounded="20px" w="300px">
          Sign in
        </Button>
      </Link>

      <Link to="/register">
        <Button rounded="20px" w="300px">
          Create account
        </Button>
      </Link>
      <p className=" text-xs ">
        By signing up, you agree to the Terms of Service and Privacy Policy,
        including Cookie Use.
      </p>
    </div>
  );
};

export default CardBeforeLogin;

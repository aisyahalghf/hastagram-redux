import { Button } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Verification = () => {
  let { token } = useParams();
  let [user, setUser] = useState("");

  const verification = async () => {
    try {
      let verification = await axios.patch(
        `http://localhost:4000/users/verify`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setUser(verification.data.data.username);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    verification();
  });

  return (
    <div>
      {user === "" ? (
        <p> Loading... </p>
      ) : (
        <div className=" border border-slate-200  w-[50%] flex flex-col container mx-auto p-10 mt-[60px]">
          <p className=" font-bold text-xl mb-10 ">Hastagram</p>
          <div className="font-semibold mb-5">Welcome {user}</div>
          <p className=" mb-5 ">
            Congratulations your account has been activated, So you can start
            sharing your amazing photos on our platform, enjoy!!
          </p>
          <p className="text-center mb-3 ">
            You can start by clicking the button below
          </p>
          <div className="ml-[40%]">
            <Link to="/login">
              <Button>Getting Started</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;

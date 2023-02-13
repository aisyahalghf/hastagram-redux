import { Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import CreateProfile from "../Pages/CreateProfile";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ data, keepLogin }) => {
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleVerified = async () => {
    try {
      setLoading(true);
      let storage = localStorage.my_Token;
      let data = await axios.get(
        `http://localhost:4000/users/resend-verified`,
        {
          headers: {
            Authorization: `${storage}`,
          },
        }
      );
      toast(data.data.message);
      setLoading(true);
    } catch (error) {
      setLoading(false);
      console.log(data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(`my_Token`);
    navigate("/");
    window.location.reload();
  };

  let photoProfile = `http://localhost:4000${data?.profile_picture?.slice(6)}`;

  return (
    <nav className=" shadow shadow-slate-200 sticky top-0 z-10 bg-white ">
      <div className="container mx-auto flex flex-row justify-center gap-32 items-center">
        {data.username ? (
          <Link to="/">
            <div className=" font-mono font-semibold text-2xl ">Hashtagram</div>
          </Link>
        ) : (
          <Link to="/">
            <div className=" font-mono font-semibold text-2xl p-5 ">
              Hashtagram
            </div>
          </Link>
        )}

        <div className=" w-[50%] h-fit"></div>
        <div>
          {data.username ? (
            <div className="flex flex-row gap-3 pt-5 w-[350px] items-center mb-3 ">
              {data.profile_picture ? (
                <img
                  src={photoProfile}
                  alt="photo"
                  width="40px"
                  className=" rounded-[18px] h-[38px] "
                  onClick={handleLogout}
                />
              ) : (
                <Icon className=" text-[40px]" icon="iconoir:profile-circle" />
              )}

              <div className=" flex flex-col items-start">
                <div className="font-bold">{data.username}</div>
                {data.bio ? (
                  <div className=" text-xs font-semibold text-slate-400 ">
                    {data.fullname}
                  </div>
                ) : data.status === "unverified" ? (
                  <Button
                    colorScheme="red"
                    fontSize="12px"
                    h="fit-content"
                    p="5px"
                    onClick={handleVerified}
                    disabled="disable"
                  >
                    unverified
                  </Button>
                ) : loading === true ? null : (
                  <CreateProfile
                    fontSize="12px"
                    h="fit-content"
                    p="5px"
                    keepLogin={keepLogin}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="w-[350px]"></div>
          )}
        </div>
      </div>
      <Toaster />
    </nav>
  );
};

export default Navbar;

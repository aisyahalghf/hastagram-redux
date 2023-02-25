import { Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import CreateProfile from "../Pages/CreateProfile";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let user = useSelector((state) => state.auth);

  const handleVerified = async () => {
    try {
      setLoading(true);
      let storage = localStorage.my_Token;
      console.log(storage);
      let data = await axios.get(
        `http://localhost:4000/users/resend-verified`,
        {
          headers: {
            Authorization: `${storage}`,
          },
        }
      );
      toast(data.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(`my_Token`);
    navigate("/");
    window.location.reload();
  };

  let photoProfile = `http://localhost:4000${user?.user?.profile_picture?.slice(
    6
  )}`;

  return (
    <nav className=" shadow shadow-slate-200 sticky top-0 z-10 bg-white ">
      <div className="container mx-auto flex flex-row justify-center gap-32 items-center">
        {user?.user?.username ? (
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
          {user?.user?.username ? (
            <div className="flex flex-row gap-3 pt-5 w-[350px] items-center mb-3 ">
              {user.user.profile_picture ? (
                <img
                  src={photoProfile}
                  alt=""
                  width="40px"
                  className=" rounded-[18px] h-[38px] "
                  onClick={handleLogout}
                />
              ) : (
                <Icon className=" text-[40px]" icon="iconoir:profile-circle" />
              )}

              <div className=" flex flex-col items-start">
                <div className="font-bold">{user.user.username}</div>
                {user.user.bio ? (
                  <div className=" text-xs font-semibold text-slate-400 ">
                    {user.user.fullname}
                  </div>
                ) : user.user.status === "unverified" ? (
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
                    // keepLogin={keepLogin}
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

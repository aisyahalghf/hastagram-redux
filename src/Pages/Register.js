import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/action/user";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth);

  // console.log(user);

  let username = useRef();
  let email = useRef();
  let password = useRef();
  let repeatPassword = useRef();

  const handleRegister = () => {
    try {
      setLoading(true);
      let inputusername = username.current.value;
      let inputEmail = email.current.value;
      let inputPassword = password.current.value;
      let inputRepeatPassword = repeatPassword.current.value;

      dispatch(
        registerUser({
          username: inputusername,
          email: inputEmail,
          password: inputPassword,
          repeatPassword: inputRepeatPassword,
        })
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (user.user.message) {
      setLoading(true);
      toast(user.user.message);
      username.current.value = "";
      email.current.value = "";
      password.current.value = "";
      repeatPassword.current.value = "";
      setLoading(false);
    } else {
      setLoading(false);
    }
  });

  const handleVisible = () => {
    let x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const handleVisible2 = () => {
    let y = document.getElementById("myInput2");
    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
  };

  return (
    <div>
      <div className="  w-1/4  m-auto ">
        <h1 className="text-3xl font-bold text-center m-20   ">
          Create an account
        </h1>
        <div>
          <div className=" flex-col border border-slate-300 shadow-2xl rounded-xl text-center h-130 pb-10 pt-10">
            <h4 className="p-3 text-xs ">*indicates required field </h4>
            <h2 className="font-bold m-2">Personal Information</h2>
            <div>
              <Input
                w="300px"
                m="0 auto"
                placeholder="*Username"
                type="text"
                ref={username}
              />
            </div>
            <div className="font-bold m-2">Account Security</div>
            <div>
              <Input
                w="300px"
                m="0 auto"
                placeholder="*Email"
                type="email"
                ref={email}
              />
            </div>
            <InputGroup size="md" w="300px" m="0 auto" mb="10px" mt="10px">
              <Input
                placeholder="Password"
                type="Password"
                id="myInput"
                ref={password}
              />
              <InputRightElement>
                <Icon
                  onClick={handleVisible}
                  icon="ic:outline-remove-red-eye"
                />
              </InputRightElement>
            </InputGroup>
            <InputGroup size="md" w="300px" m="0 auto">
              <Input
                placeholder="Repeat password"
                type="Password"
                id="myInput2"
                ref={repeatPassword}
              />
              <InputRightElement>
                <Icon
                  onClick={handleVisible2}
                  icon="ic:outline-remove-red-eye"
                />
              </InputRightElement>
            </InputGroup>

            {loading === true ? null : (
              <div className=" flex flex-row justify-center gap-5">
                <Link to="/login">
                  <Button
                    colorScheme="blackAlpha"
                    className="pl-2 pr-2 p-1 mt-2 border border-slate-500 rounded-xl m-0-auto"
                  >
                    login
                  </Button>
                </Link>
                <Button
                  onClick={handleRegister}
                  className="pl-2 pr-2 p-1 mt-2 border border-slate-500 rounded-xl m-0-auto"
                >
                  Register
                </Button>
              </div>
            )}

            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

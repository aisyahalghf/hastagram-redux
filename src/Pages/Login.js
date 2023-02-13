import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Login = ({ handleLogin }) => {
  let usernameOrEmail = useRef();
  let password = useRef();

  const handleVisible = () => {
    let x = document.getElementById("myInput");

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <div className="  w-1/4  m-auto ">
      <h1 className="text-3xl font-bold text-center m-20  ">Sign in</h1>
      <div>
        <div className=" flex-col border border-slate-300 shadow-2xl rounded-xl text-center h-130 pb-10 pt-10">
          <h4 className="p-3">*indicates required field </h4>
          <div>
            <Input
              w="300px"
              m="0 auto"
              placeholder="*username or email"
              type="text"
              ref={usernameOrEmail}
            />
          </div>
          <div>
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
          </div>
          <p>{}</p>
          <div className=" flex flex-row gap-3 justify-center ">
            <Link to="/register">
              <Button
                colorScheme="blackAlpha"
                className="pl-2 pr-2 p-1 mt-2 border border-slate-500 rounded-xl m-0-auto"
              >
                Registrasi
              </Button>
            </Link>
            <Button
              onClick={() =>
                handleLogin({
                  usernameOrEmail: usernameOrEmail.current.value,
                  password: password.current.value,
                })
              }
              className="pl-2 pr-2 p-1 mt-2 border border-slate-500 rounded-xl m-0-auto"
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

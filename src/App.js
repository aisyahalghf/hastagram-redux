import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Navbar from "./Component /Navbar";
import Home from "./Pages/Home";
import Verification from "./Pages/Verification";
import UsersProfile from "./Pages/UsersProfile";
import UsersProfileDetail from "./Pages/UserProfileDetail";

import { useNavigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

function App() {
  let [data, setData] = useState({});
  let [album, setAlbum] = useState([]);
  let [message, setMessage] = useState("");
  let [contentUsers, setContentUser] = useState([]);
  let navigate = useNavigate();

  const handleLogin = async (data) => {
    console.log(data);
    try {
      let emailOrUsername = data.usernameOrEmail;
      let password = data.password;

      let getData = await axios.post(`http://localhost:4000/users/sign-in`, {
        emailOrUsername,
        password,
      });
      // toast(getData.data.data.message);
      setData(getData.data.data);

      localStorage.setItem("my_Token", getData.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    }
  };

  const keepLogin = async () => {
    try {
      let getStorage = localStorage.my_Token;
      let response = await axios.get(`http://localhost:4000/users/keep-login`, {
        headers: {
          Authorization: `${getStorage}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAlbum = async () => {
    try {
      let getStorage = localStorage.my_Token;
      let data = await axios.get(`http://localhost:4000/content/all-content`, {
        headers: {
          Authorization: `${getStorage}`,
        },
      });
      setAlbum(data.data);
      if (data.data.data.length === 0) {
        setMessage("Not Post Yet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllContent = async () => {
    try {
      let getContent = await axios.get(
        `http://localhost:4000/content/all-users-content`
      );
      setContentUser(getContent.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    keepLogin();
    getAlbum();
    getAllContent();
  }, []);

  return (
    <div>
      <Navbar data={data} keepLogin={keepLogin} />
      <Routes>
        <Route
          path="/register"
          element={data.username ? <navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={
            data.username ? (
              <navigate to="/" />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/"
          element={
            <Home
              data={data}
              contentUsers={contentUsers}
              getAllContent={getAllContent}
            />
          }
        />
        <Route path="/authentication/:token" element={<Verification />} />
        <Route
          path="/profile"
          element={
            <UsersProfile
              album={album}
              data={data}
              message={message}
              keepLogin={keepLogin}
            />
          }
        />
        <Route
          path="/profile/detail/:id"
          element={<UsersProfileDetail getAlbum={getAlbum} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

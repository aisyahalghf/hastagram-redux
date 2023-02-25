import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Navbar from "./Component /Navbar";
import Home from "./Pages/Home";
import Verification from "./Pages/Verification";
import UsersProfile from "./Pages/UsersProfile";
import UsersProfileDetail from "./Pages/UserProfileDetail";

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { keepLogin } from "./redux/action/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(keepLogin());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/authentication/:token" element={<Verification />} />
        <Route path="/profile" element={<UsersProfile />} />
        <Route path="/profile/detail/:id" element={<UsersProfileDetail />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

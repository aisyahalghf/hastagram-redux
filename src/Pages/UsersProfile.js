import { Link } from "react-router-dom";
import CardEditProfile from "../Component /CardEditProfile";
import CardOwnLibrary from "../Component /CardOwnLibrary";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { keepLogin } from "../redux/action/user";
import { useSelector, useDispatch } from "react-redux";
import { userAlbum } from "../redux/action/userContent";
import { useEffect } from "react";

const UsersProfile = () => {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.auth);
  let content = useSelector((state) => state.content);
  let photoProfile = `http://localhost:4000${user?.user?.profile_picture?.slice(
    6
  )}`;

  const showUserAlbum = () => {
    if (!content.content[1]) {
      return (
        <p className=" font-bold text-xl text-gray-500 text-center mt-8 ">
          NO POST YET
        </p>
      );
    } else {
      return content?.content?.map((val, idx) => {
        return (
          <Link to={`/profile/detail/${val.id}`}>
            <div key={idx.toLocaleString()}>
              <CardOwnLibrary
                image={`http://localhost:4000${val?.images?.slice(6)}`}
                create={val.create_at.slice(0, 10)}
              />
            </div>
          </Link>
        );
      });
    }
  };

  useEffect(() => {
    dispatch(userAlbum());
  }, [dispatch]);

  const handleSave = async (e) => {
    try {
      let inputFullname = e.fullname;
      let inputBio = e.bio;
      let inputUsername = e.username;
      let token = localStorage.my_Token;
      let addFile = e.addFile;

      let formData = new FormData();
      formData.append("images", addFile);
      formData.append("fullName", inputFullname);
      formData.append("bio", inputBio);
      formData.append("userName", inputUsername);
      await axios.patch(
        `http://localhost:4000/user-profile/edit-photo-profile`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast("change profile success");
      dispatch(keepLogin());
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    }
  };

  return (
    <div className=" container mx-auto w-[60%] ">
      <div className="flex flex-row justify-start gap-5 p-10">
        <div>
          <img
            src={photoProfile}
            alt="profile"
            width="150px"
            className=" rounded-[100px] h-[140px] "
          />
        </div>
        <div className=" flex flex-col justify-center gap-3 ">
          <div className=" flex flex-row items-end gap-3  ">
            <div className="text-lg font-bold">{user?.user?.username}</div>
            <CardEditProfile datas={user?.user} handleSave={handleSave} />
          </div>
          <div>
            <div className=" text-sm font-semibold ">
              {user?.user?.fullname}
            </div>
            <div className=" text-sm font-light">{user?.user?.bio}</div>
          </div>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-3 gap-1 items-center mt-10 ">
        {showUserAlbum()}
      </div>
      <Toaster />
    </div>
  );
};

export default UsersProfile;

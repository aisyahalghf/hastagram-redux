import { Link } from "react-router-dom";
import CardEditProfile from "../Component /CardEditProfile";
import CardOwnLibrary from "../Component /CardOwnLibrary";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const UsersProfile = ({ data, album, message, keepLogin }) => {
  let photoProfile = `http://localhost:4000${data?.profile_picture?.slice(6)}`;
  let datas = data;

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
      let getData = await axios.patch(
        `http://localhost:4000/user-profile/edit-photo-profile`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast("change profile success");
      keepLogin();
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
            <div className="text-lg font-bold">{data?.username}</div>
            <CardEditProfile datas={datas} handleSave={handleSave} />
          </div>
          <div>
            <div className=" text-sm font-semibold ">{data?.fullname}</div>
            <div className=" text-sm font-light">{data?.bio}</div>
          </div>
        </div>
      </div>
      <hr />
      <div className=" font-bold text-xl text-gray-500 text-center mt-8 ">
        {message}
      </div>
      <div className="grid grid-cols-3 gap-1 items-center mt-10 ">
        {album?.data?.map((val, idx) => {
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
        })}
      </div>
      <Toaster />
    </div>
  );
};

export default UsersProfile;

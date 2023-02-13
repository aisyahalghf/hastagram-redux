import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import CardBeforeLogin from "../Component /CardBeforeLogin";
import PostPhoto from "./PostPhoto";
import CardPhoto from "../Component /CardPhoto";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Home = ({ data }) => {
  let [contentUsers, setContentUser] = useState([]);

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
    getAllContent();
  }, []);

  return (
    <div className="flex flex-row container mx-auto justify-end gap-32   ">
      {!data.username || data.status === "unverified" ? null : (
        <div className=" flex flex-col gap-10 font-semibold text-xl pt-5 fixed left-0 right-0 container mx-auto ">
          <Link to="/">
            <div className="flex flex-row gap-5 ">
              <Icon className=" text-[27px] " icon="mingcute:home-5-fill" />
              <div>Home</div>
            </div>
          </Link>

          <div className="flex flex-row gap-5  ">
            <Icon className=" text-[27px] " icon="ic:baseline-search" />
            <div>Search</div>
          </div>

          <div className="flex flex-row gap-5 ">
            <Icon className=" text-[27px] " icon="gridicons:create" />
            <PostPhoto getAllContent={getAllContent} />
          </div>

          <div className="flex flex-row gap-5 ">
            <Icon className=" text-[27px] " icon="ri:notification-2-line" />
            <div>Notifications</div>
          </div>

          <Link to="/profile">
            <div className="flex flex-row gap-5 ">
              <Icon className=" text-[27px] " icon="iconoir:profile-circle" />
              <div>Profile</div>
            </div>
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-10 border border-r-slate-200  border-l-slate-200  p-5 w-[50%] h-fit shadow shadow-slate-200">
        <div className=" font-semibold text-xl">Home</div>
        <div className="flex flex-col justify-center font-semibold items-center  ">
          {contentUsers.map((val, idx) => {
            return (
              <div key={idx.toLocaleString()}>
                <CardPhoto
                  name={val?.username}
                  photo_profile={`http://localhost:4000${val?.profile_picture?.slice(
                    6
                  )}`}
                  image={`http://localhost:4000${val?.images?.slice(6)}`}
                  captions={val?.caption}
                  likes={val?.likes}
                  bio={val?.bio}
                  create={val.create_at.slice(0, 10)}
                  id={val?.id}
                />
              </div>
            );
          })}
        </div>
      </div>
      {data.username ? (
        <div className="w-[350px]"></div>
      ) : (
        <div>
          <CardBeforeLogin />
        </div>
      )}
    </div>
  );
};

export default Home;

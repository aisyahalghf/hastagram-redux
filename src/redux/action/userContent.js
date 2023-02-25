import axios from "axios";
import { contentSlice } from "../reducer/content";

export const getAllContents = "getAllContents";
export const contentAllUser = () => {
  return async (dispatch) => {
    dispatch({ type: getAllContents });
    try {
      let getContent = await axios.get(
        `http://localhost:4000/content/all-users-content`
      );
      dispatch(contentSlice.actions.contentAllUser(getContent.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const userAlbumRequest = "userAlbumRequest";

export const userAlbum = () => {
  return async (dispatch) => {
    dispatch({ type: userAlbumRequest });
    try {
      let getStorage = localStorage.my_Token;
      let getAlbum = await axios.get(
        `http://localhost:4000/content/all-content`,
        {
          headers: {
            Authorization: `${getStorage}`,
          },
        }
      );
      dispatch(contentSlice.actions.userAlbum(getAlbum.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

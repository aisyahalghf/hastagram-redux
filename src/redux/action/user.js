import axios from "axios";
import { toast } from "react-hot-toast";
import { authSlice } from "../reducer/auth";

export const registerUser = ({ username, email, password, repeatPassword }) => {
  return async (dispatch) => {
    try {
      if (password !== repeatPassword) {
        throw {
          response: {
            data: { message: "password dan repeat password not match" },
          },
        };
      } else if (!username || !email || !password || !repeatPassword) {
        throw {
          response: {
            data: { message: "data incomplite" },
          },
        };
      } else {
        let response = await axios.post(`http://localhost:4000/users/sign-up`, {
          username,
          email,
          password,
        });
        console.log(response.data);
        dispatch(authSlice.actions.registerSuccess(response.data));
      }
    } catch (error) {
      dispatch(authSlice.actions.failed(error.response.data.message));
      toast(error.response.data.message);
    }
  };
};

export const loginUser = ({ usernameOrEmail, password }) => {
  return async (dispatch) => {
    try {
      let getData = await axios.post(`http://localhost:4000/users/sign-in`, {
        emailOrUsername: usernameOrEmail,
        password,
      });
      dispatch(authSlice.actions.loginSuccess(getData.data));
    } catch (error) {
      dispatch(authSlice.actions.failed(error.response.data.message));
    }
  };
};

export const keep_login_request = "keep_login_request";
export const keep_login_payload = "keep_login_payload";

export const keepLogin = () => {
  try {
    return async (dispatch) => {
      dispatch({ type: keep_login_request });
      let getStorage = localStorage.my_Token;
      let response = await axios.get(`http://localhost:4000/users/keep-login`, {
        headers: {
          Authorization: `${getStorage}`,
        },
      });
      dispatch(authSlice.actions.keep_login_payload(response.data.data));
    };
  } catch (error) {
    console.log(error);
  }
};

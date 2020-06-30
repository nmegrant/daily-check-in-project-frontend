import axios from "axios";

export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const LOG_OUT_USER = "LOG_OUT_USER";

function userLoggedIn(userData) {
  return { type: USER_LOGGED_IN, payload: userData };
}

function logOutUser() {
  return { type: LOG_OUT_USER, payload: null };
}

export function login(email, password) {
  return async function thunk(dispatch, getState) {
    const { data: userData } = await axios.post("http://localhost:4000/login", {
      email,
      password,
    });
    dispatch(userLoggedIn(userData));
  };
}

export function logout(dispatch, getState) {
  dispatch(logOutUser());
}

export function getUserWithStoredToken() {
  return async function thunk(dispatch, getState) {
    if (localStorage.getItem("token")) {
      const { data: userData } = await axios.get("http://localhost:4000/me", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      dispatch(userLoggedIn({ ...userData, token: localStorage.token }));
    }
  };
}

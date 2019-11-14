import { USER_LOGIN, USER_LOGOUT } from "../actionTypes";

export function loginUser(user) {
  return {
    type: USER_LOGIN,
    payload: user
  };
}

export function logoutUser() {
  return {
    type: USER_LOGOUT
  };
}

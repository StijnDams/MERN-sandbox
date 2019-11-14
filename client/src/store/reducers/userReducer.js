import { USER_LOGIN, USER_LOGOUT } from "../actionTypes";

function userReducer(previousState = {}, action) {
  switch (action && action.type) {
    case USER_LOGIN: {
      const { payload: user } = action;

      return {
        ...previousState,
        user
      };
    }
    case USER_LOGOUT: {
      return {
        ...previousState,
        user: undefined
      };
    }
    default:
      return previousState;
  }
}

export default userReducer;

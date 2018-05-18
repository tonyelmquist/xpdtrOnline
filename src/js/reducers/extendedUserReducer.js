import { FETCH_PROJECTS, FETCH_USER, FETCH_USERS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
          case FETCH_USERS:
      return action.payload;
          case FETCH_USER:
      return action.payload;
    default:
      return state;
  }
};
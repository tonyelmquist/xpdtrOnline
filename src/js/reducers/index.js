import { combineReducers } from "redux";

import projects from "./projectsReducer";
import extendedUser from "./extendedUserReducer";

export default combineReducers({
  extendedUser,
  projects
});

import { projectsRef, usersRef } from "../config/firebase";
import { FETCH_PROJECTS, FETCH_USER, FETCH_USERS } from "./types";

export const addProject = newProject => async dispatch => {
  projectsRef.push().set(newProject);
};

export const completeProject = completeProjectId => async dispatch => {
  projectsRef.child(completeProjectId).remove();
};

export const fetchProjects = (userID) => async dispatch => {
  projectsRef.orderByChild('userID').equalTo(userID).on("value", snapshot => {
    dispatch({
      type: FETCH_PROJECTS,
      payload: snapshot.val(),
    });
  });
};

export const addUser = newUser => async dispatch => {
  usersRef.push().set(newUser);
};

export const completeUser = completeUserId => async dispatch => {
  usersRef.child(completeUserId).remove();
};

export const fetchUsers = () => async dispatch => {
  usersRef.on("value", snapshot => {
    dispatch({
      type: FETCH_USERS,
      payload: snapshot.val()
    });
  });
};

export const fetchUser = (userID) => async dispatch => {
  usersRef.orderByChild('userID').equalTo(userID).on("value", snapshot => {
    dispatch({
      type: FETCH_USER,
      payload: snapshot.val()
    });
  });
};


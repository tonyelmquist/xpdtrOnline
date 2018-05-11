
import { projectsRef } from "../config/firebase";
import { FETCH_PROJECTS } from "./types";

export const addProject = newProject => async dispatch => {
  projectsRef.push().set(newProject);
};

export const completeProject = completeProjectId => async dispatch => {
  projectsRef.child(completeProjectId).remove();
};

export const fetchProjects = () => async dispatch => {
  projectsRef.on("value", snapshot => {
    dispatch({
      type: FETCH_PROJECTS,
      payload: snapshot.val()
    });
  });
};
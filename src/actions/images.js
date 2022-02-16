import axios from "axios";
import { newError } from "./error";

import baseUrl from "../utils/common";

const ADD_NEW_IMAGE = "ADD_NEW_IMAGE";
const DELETE_ONE_IMAGE = "DELETE_ONE_IMAGE";

const uploadImageSuccess = image => ({
  type: ADD_NEW_IMAGE,
  image
});

export const uploadImage = data => (dispatch, getState) => {
  const { userReducer, advertReducer } = getState();
  const { jwt } = userReducer;
  const { selectedAdvert } = advertReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  console.log("Image Data on action:"+JSON.stringify(data));
  axios
    .post(`${baseUrl}/image/upload/${selectedAdvert.id}`, data)
    .then(res => {
      dispatch(uploadImageSuccess(res.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const removeImageSuccess = image => ({
  type: DELETE_ONE_IMAGE,
  image
});

export const removeImage = (publicId, imageId) => (dispatch, getState) => {
  const { userReducer, advertReducer } = getState();
  const { jwt } = userReducer;
  const { selectedAdvert } = advertReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .delete(`${baseUrl}/image/${publicId}/${selectedAdvert.id}/${imageId}`)
    .then(res => {
      dispatch(removeImageSuccess(res.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

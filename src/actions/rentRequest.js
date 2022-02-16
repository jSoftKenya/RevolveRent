import axios from "axios";
import { clearErrors } from "./error";

import baseUrl from "../utils/common";

const LOG_IN_RENTREQUEST = "LOG_IN__RENTREQUEST";
const FETCH_RENTREQUEST_TICKETS = "FETCH_RENTREQUEST_TICKETS";
const LOG_OUT_RENTREQUEST = "LOG_OUT_RENTREQUEST";
const RENTREQUEST_ACTION_ERROR = "RENTREQUEST_ACTION_ERROR";
const RENT_REQUEST = "RENT_REQUEST";




const rentRequestCreateError = error => {
  // console.log(error)
  if (typeof error == 'string'){
    return {
      type: RENTREQUEST_ACTION_ERROR,
      error: error
    };
  } else {
    return {
      type: RENTREQUEST_ACTION_ERROR,
      error: error.data.message
    };
  }
  
};

const rentRequestCreateSuccess = rentRequest => ({
  type: RENT_REQUEST,
  rentRequest
});

export const createUser = data => dispatch => {
  axios
    .post(`${baseUrl}/rentRequest/create`, { ...data })
    .then(response => {
      dispatch(rentRequestCreateSuccess(response.data));
      dispatch(clearErrors());
    })
    .catch(err => dispatch(rentRequestCreateError(err.response)));
};

const rentRequestLoginSuccess = rentRequest => ({
  type: LOG_IN_RENTREQUEST,
  rentRequest
});

export const loginUser = data => dispatch => {
  axios
    .post(`${baseUrl}/rentRequest/login`, { ...data })
    .then(response => {
      dispatch(rentRequestLoginSuccess(response.data));
      dispatch(clearErrors());
    })
    .catch(err => {
      // console.log(err);
      dispatch(rentRequestCreateError(err.response))});
};

const rentRequestTicketsFetchSuccess = rentRequest => ({
  type: FETCH_RENTREQUEST_TICKETS,
  tickets: rentRequest.tickets
});

export const fetchUserTickets = rentRequestId => dispatch => {
  axios
    .get(`${baseUrl}/rentRequest/${rentRequestId}`)
    .then(response => {
      dispatch(rentRequestTicketsFetchSuccess(response.data));
    })
    .catch(err => dispatch(rentRequestCreateError(err.response)));
};

const rentRequestLogOutSuccess = () => ({
  type: LOG_OUT_RENTREQUEST,
  logout: true
});

export const logMeOut = () => dispatch => {
  dispatch(rentRequestLogOutSuccess());
};

export const creditAddSuccess = rentRequest => ({
  type: RENT_REQUEST,
  rentRequest
});

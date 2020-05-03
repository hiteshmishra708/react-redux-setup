import { action_types, urls } from "./constants";
import { Api } from './api';

export const callApi = (action, body, rType = "POST", hasFile = false, fileList = [], hType = 1) => async dispatch => {
  let url, isFile = false, isExtUrl = false, clearData = false, loading = true;
  switch (action) {
    case action_types.LOGIN:
      url = urls.LOGIN_URL;
      clearData = true;
      break;
    default:
      dispatch({
        type: action_types.UI_REFRESH
      });
      break;
  }
  try {
    if (loading) {
      dispatch({
        type: action_types.LOADER,
        payload: true
      });
    }
    let response = null;
    response = await Api(url, body, rType, isFile, isExtUrl, hType);
    console.log("response", response)
    if (response.status === 403) {
      dispatch({
        type: action_types.LOGOUT
      });
    } else if (response.status === 200) {
      if (clearData) {
        dispatch({
          type: action_types.CLEAR_DATA
        });
      }
      dispatch({
        type: action,
        payload: response
      });
    } else {
      dispatch({
        type: action,
        payload: response
      });
    }
    if (loading) {
      dispatch({
        type: action_types.LOADER,
        payload: false
      });
    }
  } catch (error) {
    console.log(error)
    if (loading) {
      dispatch({
        type: action_types.LOADER,
        payload: false
      });
    }
    // dispatch({
    //     type: action_types.SERVER_ERROR
    // });
  }
};

export const clearData = (type) => async dispatch => {
  dispatch({
    type: type
  });
};

export const updateReducer = (type, data) => async dispatch => {
  dispatch({
    type: type,
    payload: data
  })
};

export const loader = (visibility) => dispatch => {
  switch (visibility) {
    case "show":
      dispatch({
        type: action_types.LOADER,
        payload: true
      });
      break
    default:
      dispatch({
        type: action_types.LOADER,
        payload: false
      });
      break
  }
};

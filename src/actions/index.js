import { BASEURL, API, SET_RESPONSE_DATA, FETCH_API_DATA, CREATE_USER } from './types'

export function fetchUsers() {
    return apiAction({
      url: BASEURL + "/users",
      onSuccess: setResponseData,
      onFailure: () => console.log("Error occured loading articles"),
      label: FETCH_API_DATA
    });
  }

export function fetchUserData(id) {
    return apiAction({
      url: BASEURL + "/users/" +id,
      onSuccess: setResponseData,
      onFailure: () => console.log("Error occured loading articles"),
      label: FETCH_API_DATA
    });
  }

export function createUser(data) {
    return apiAction({
      url: BASEURL + "/users",
      method: "POST",
      accessToken: "e0efc6659cc309c930f87b2f05597096eb9e83c729318d107976cb36dca81b5e",
      data: data,
      onSuccess: setResponseData,
      onFailure: () => console.log("Error occured loading articles"),
      label: CREATE_USER
    });
  }

function setResponseData(data) {
    return {
        type: SET_RESPONSE_DATA,
        payload: data
    }
}

function apiAction({
    url = "",
    method = "GET",
    data = null,
    accessToken = null,
    onSuccess = () => {},
    onFailure = () => {},
    label = "",
    headersOverride = null
  }) {
    return {
      type: API,
      payload: {
        url,
        method,
        data,
        accessToken,
        onSuccess,
        onFailure,
        label,
        headersOverride
      }
    };
  }
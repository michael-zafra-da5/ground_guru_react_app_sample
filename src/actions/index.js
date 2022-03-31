import { 
  BASEURL_NODE, 
  BASEURL, 
  API, 
  SET_RESPONSE_DATA, 
  FETCH_API_DATA, 
  CREATE_USER, 
  SET_CREATE_USER_RESPONSE_DATA, 
  DELETE_USER, 
  DELETE_USER_RESPONSE,
  LOGIN_RESPONSE } from './types'

// 3rd party API
export function createUser(data) {
  console.log(BASEURL + "/users " + data);
  return apiAction({
    url: BASEURL + "/users",
    method: "POST",
    accessToken: "e0efc6659cc309c930f87b2f05597096eb9e83c729318d107976cb36dca81b5e",
    data: data,
    onSuccess: setCreateResponseData,
    onFailure: () => console.log("Error occured loading articles"),
    label: CREATE_USER
  });
}

export function fetchUsers() {
    return apiAction({
      url: BASEURL + "/users",
      accessToken: "e0efc6659cc309c930f87b2f05597096eb9e83c729318d107976cb36dca81b5e",
      onSuccess: setResponseData,
      onFailure: () => console.log("Error occured loading articles"),
      label: FETCH_API_DATA
    });
  }

export function fetchUserData(id) {
    return apiAction({
      url: BASEURL + "/users/" +id,
      accessToken: "e0efc6659cc309c930f87b2f05597096eb9e83c729318d107976cb36dca81b5e",
      onSuccess: setResponseData,
      onFailure: () => console.log("Error occured loading articles"),
      label: FETCH_API_DATA
    });
  }

export function updateUserData(data, id) {
    return apiAction({
      url: BASEURL + "/users/" +id,
      method: "PUT",
      accessToken: "e0efc6659cc309c930f87b2f05597096eb9e83c729318d107976cb36dca81b5e",
      data: data,
      onSuccess: setResponseData,
      onFailure: () => console.log("Error occured loading articles"),
      label: FETCH_API_DATA
    });
  }

export function deleteUserData(id) {
    return apiAction({
      url: BASEURL + "/users/" +id,
      method: "DELETE",
      accessToken: "e0efc6659cc309c930f87b2f05597096eb9e83c729318d107976cb36dca81b5e",
      onSuccess: setDeleteResponseData,
      onFailure: () => console.log("Error occured loading articles"),
      label: DELETE_USER
    });
  }






//NodeJS project API
export function registerUser(data) {
  console.log(BASEURL_NODE + "/api/user/createUser " + data);
  return apiAction({
    url: BASEURL_NODE + "/api/user/createUser",
    method: "POST",
    data: data,
    onSuccess: setCreateResponseData,
    onFailure: () => console.log("Error occured loading articles"),
    label: CREATE_USER
  });
}

export function login(data) {
  console.log(BASEURL_NODE + "/api/auth/login " + data);
  return apiAction({
    url: BASEURL_NODE + "/api/auth/login",
    method: "POST",
    data: data,
    onSuccess: setLoginResponse,
    onFailure: () => console.log("Error occured loading articles"),
    label: LOGIN_RESPONSE
  });
}

export function getUsers(token) {
  console.log(BASEURL_NODE + "/api/user/getList ");
  return apiAction({
    url: BASEURL_NODE + "/api/user/getList",
    method: "GET",
    accessToken: token,
    onSuccess: setResponseData,
    onFailure: () => console.log("Error occured loading articles"),
    label: FETCH_API_DATA
  });
}

export function getUser(token) {
  console.log(BASEURL_NODE + "/api/user");
  return apiAction({
    url: BASEURL_NODE + "/api/user",
    method: "POST",
    accessToken: token,
    onSuccess: setResponseData,
    onFailure: () => console.log("Error occured loading articles"),
    label: FETCH_API_DATA
  });
}

function setResponseData(data) {
    return {
        type: SET_RESPONSE_DATA,
        payload: data
    }
}

function setCreateResponseData(data) {
    return {
        type: SET_CREATE_USER_RESPONSE_DATA,
        payload: data
    }
}

function setDeleteResponseData(data) {
    return {
        type: DELETE_USER_RESPONSE,
        payload: data
    }
}

function setLoginResponse(data) {
    return {
        type: LOGIN_RESPONSE,
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


export function tokenAction(token) {
  return {
    type: "access_token",
    payload: token
  }
};
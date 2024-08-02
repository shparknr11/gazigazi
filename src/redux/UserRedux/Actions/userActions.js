export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
export const SET_TOKEN = "SET_TOKEN";

export const setUser = user => ({
  type: "SET_USER",
  payload: user,
});

export const setToken = token => ({
  type: "SET_TOKEN",
  token,
});

export const clearUser = () => ({
  type: "CLEAR_USER",
});

export const logout = () => ({
  type: "CLEAR_USER",
});

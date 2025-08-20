import instance from "./http";


export const register = (data) => {
  return instance.post("/user/register", data);
};

export const login = (data) => {
  return instance.post("/user/login", data);
};


export const logout = () => {
  return instance.post("/user/logout");
};
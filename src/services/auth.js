import instance from "./http";


export const register = (data) => {
  return instance.post("/auth/register", data);
};

export const login = (data) => {
  return instance.post("/auth/login", data);
};


export const logout = () => {
  return instance.post("/auth/logout");
};
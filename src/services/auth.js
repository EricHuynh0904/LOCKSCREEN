import instance from "./http";


export const register = (data) => {
  return instance.post("/users", data);
};

export const login = (data) => {
  return instance.post("/posts", data);
};


export const logout = () => {
  return instance.post("/logout");
};
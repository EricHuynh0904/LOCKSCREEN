import axiosClient from "./http";

// Đăng ký
export const register = (data) => {
  return axiosClient.post("/auth/register", data);
};

// Đăng nhập
export const login = (data) => {
  return axiosClient.post("/auth/login", data);
};

// Đăng xuất
export const logout = () => {
  return axiosClient.post("/auth/logout");
};
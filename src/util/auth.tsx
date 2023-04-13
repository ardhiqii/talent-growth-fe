import axios from "axios";

const ROOT_URL = "https://talent-growth-be.onrender.com";

export const login = async (email: string, password: string) => {
  const url = ROOT_URL + "/login";
  const response = await axios.post(url, {
    email: email,
    password: password,
  });
  return response;
};

export const register = async (
  fullName: string,
  email: string,
  password: string
) => {
  const url = ROOT_URL + "/register";
  const response = await axios.post(url, {
    fullName,
    email,
    role: "normal",
    password,
  });
  return response
};

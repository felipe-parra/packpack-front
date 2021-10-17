import baseAxios from "../axios";

export const LoginService = async (user) => {
  const { data } = await baseAxios({
    url: "/auth/login",
    method: "POST",
    data: user,
  });
  console.log(data);
  return data;
};

export const SignUpService = async (user) => {
  const { data } = await baseAxios({
    url: "/auth/register",
    method: "POST",
    data: user,
  });
  console.log(data);
  return data;
};

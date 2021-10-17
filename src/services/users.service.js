import baseAxios from "../axios";

export const getAllUSers = async ({ token }) => {
  const { data } = await baseAxios({
    method: "GET",
    url: "/users",
    headers: {
      "access-token": token,
    },
  });
  return data.data;
};

export const getOneUser = async ({ id, token }) => {
  const { data } = await baseAxios({
    method: "GET",
    url: `/users/${id}`,
    headers: {
      "access-token": token,
    },
  });
  return data.data;
};

export const updateOneUser = async ({ id, user, token }) => {
  const { data } = await baseAxios({
    method: "PUT",
    url: `/users/${id}`,
    data: user,
    headers: {
      "access-token": token,
    },
  });
  return data.data;
};

export const createOneUser = async ({ user, token }) => {
  const { data } = await baseAxios({
    method: "POST",
    url: `/users/`,
    data: user,
    headers: {
      "access-token": token,
    },
  });
  return data.data;
};

export const deleteOneUser = async ({ id, token }) => {
  const { data } = await baseAxios({
    method: "DELETE",
    url: `/users/${id}`,
    headers: {
      "access-token": token,
    },
  });
  return data.data;
};

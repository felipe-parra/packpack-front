import axios from "axios";
import config from "../config";

const baseAxios = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "access-token-app": config.appToken,
  },
});

export default baseAxios;

import axios from "axios";

const instance = axios.create({
  baseURL: "https://cata-log-api.onrender.com/api"
});

export default instance;

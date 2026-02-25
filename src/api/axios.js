import axios from "axios";

const instance = axios.create({
  baseURL: "http://cata-log-api.onrender.com/api"
});

export default instance;

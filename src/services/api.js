import axios from "axios";

const instance = axios.create({
  baseURL: "https://drivent-g2.herokuapp.com/"
});

export default instance;

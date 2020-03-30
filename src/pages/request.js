import Axios from "axios";
// import moment from "moment";

const api = Axios.create({
  baseURL: "http://39.108.94.69:9004"
});
const getList = page => {
  return api.get(`/api/photos?page=${page}`).then(res => res.data);
};

export { getList };

import Axios from "axios";
// import moment from "moment";

const api = Axios.create({
  baseURL: "http://95.169.16.70:9002/"
});

const getList = page => {
  return api.get(`/api/photos?page=${page}`).then(res => res.data);
};

export { getList };

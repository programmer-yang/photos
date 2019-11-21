import Axios from "axios";
import Unsplash from "unsplash-js";
import moment from "moment";

const unsplash = new Unsplash({
  accessKey: "fad04db4dec91456f112247d1dfe5052e94b8c37636df7a84c1ec2e0f5c656e2"
});

const api = Axios.create({
  baseURL: "https://unsplash.com/"
});
const imgApi = Axios.create({
  baseURL: "https://images.unsplash.com"
});

const getList = page => {
  return api
    .get("napi/photos?page=1&per_page=10", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(res => {
      return res.data;
    });
};

const getUnsplashData = () => {
  console.log("getUnsplashData");

  const imgPath =
    "https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEwMjc0OH0";
  const imgPathMini =
    "https://images.unsplash.com/photo-1529472119196-cb724127a98e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEwMjc0OH0";

  const beginDate = new Date();

  unsplash.search
    .photos("dogs", 1, 10, { orientation: "portrait" })
    .then(res => res.json())
    .then(json => {
      console.log("===========");
      console.log(json);
      console.log("===========");
    });

  return imgApi
    .get(imgPath, {
      responseType: "blob"
    })
    .then(res => {
      console.log("====== diff =======");
      console.log(moment(new Date()).diff(beginDate, "ms"));
      console.log("====== diff =======");
      return res.data;
    });
};

export { getList, getUnsplashData };

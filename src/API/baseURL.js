import axios from "axios";

const instance = axios.create({
  baseURL: "ec2-3-133-108-158.us-east-2.compute.amazonaws.com:8080",
});

if (localStorage.getItem("SavedToken")) {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("SavedToken");
}

export default instance;

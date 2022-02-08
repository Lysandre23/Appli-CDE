import axios from "axios";

export default axios.create({
  baseURL: "https://cercle.polytech-services-nancy.fr/api",
  //baseURL: "https://api.cercle-des-eleves-polytech-nancy.fr/api",
  //baseURL: "http://127.0.0.1:8000/api",
});

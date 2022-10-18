import axios from "axios";

//const baseURL = "https://cercle.polytech-services-nancy.fr/api";
const baseURL = "https://api.cercle-des-eleves-polytech-nancy.fr/api";
//const baseURL = "http://127.0.0.1:8000/api";

export const baseUrlAPI = baseURL;

export default axios.create({
  baseURL: baseURL,
});

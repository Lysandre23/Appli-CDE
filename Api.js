import axios from "axios";

//const baseURL = "https://cercle.polytech-services-nancy.fr/api";
const baseURL = "https://api.cercle-des-eleves-polytech-nancy.fr/api";
<<<<<<< HEAD
//const baseURL = "http://localhost:8000/api";
=======
//const baseURL = "http://127.0.0.1:8000/api";
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
//const baseURL = "http://192.168.106.76:19000/api";

export const baseUrlAPI = baseURL;

export default axios.create({
  baseURL: baseURL,
});

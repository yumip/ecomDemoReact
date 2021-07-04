import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-ecommerce-c215f.cloudfunctions.net/api", 
//   baseURL: "http://localhost:5001/ecommerce-c215f/us-central1/api",
});

export default instance;


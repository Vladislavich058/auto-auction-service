import axios from "axios";
import authHeader from "utils/authHeader";
const API_URL = "http://localhost:8080/api/client/";

export default class ClientService {
  static async addBid(id, { bid }) {
    const response = await axios.put(API_URL + `addBid/${id}`, bid, {
      headers: authHeader(),
    });
    return response;
  }
}

import axios from "axios";
import authHeader from "utils/authHeader";
const API_URL = "http://localhost:8080/api/lots/";

export default class LotService {
  static async getLotById(id) {
    const response = await axios.get(API_URL + "getLotById/" + id);
    return response;
  }

  static async getAllLots() {
    const response = await axios.get(API_URL + "getAllLots", {
      headers: authHeader(),
    });
    return response;
  }

  static async getAllValidatedLots() {
    const response = await axios.get(API_URL + "getAllValidatedLots");
    return response;
  }

  static async getNewLots() {
    const response = await axios.get(API_URL + "getNewLots");
    return response;
  }
}

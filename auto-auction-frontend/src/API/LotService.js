import axios from "axios";
const API_URL = "http://localhost:8080/api/lots/";

export default class LotService {
  static async getLotById(id) {
    const response = await axios.get(API_URL + `getLotById/${id}`);
    return response;
  }

  static async getLots() {
    const response = await axios.get(API_URL + "getLots");
    return response;
  }

  static async getNewLots() {
    const response = await axios.get(API_URL + "getNewLots");
    return response;
  }
}

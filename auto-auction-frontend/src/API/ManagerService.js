import axios from "axios";
import authHeader from "utils/authHeader";
const API_URL = "http://localhost:8080/api/manager/";

export default class ManagerService {
  static async getLots() {
    const response = await axios.get(API_URL + "getLots", {
      headers: authHeader(),
    });
    return response;
  }

  static async addLot(formData) {
    const response = await axios.post(API_URL + "addLot", formData, {
      headers: authHeader(),
    });
    return response;
  }
}

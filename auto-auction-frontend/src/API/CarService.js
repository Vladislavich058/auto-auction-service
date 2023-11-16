import axios from "axios";
import authHeader from "utils/authHeader";
import { SERVER_URL } from "utils/constants";

export default class CarService {
  static async getAllCars() {
    const response = await axios.get(SERVER_URL + "cars", {
      headers: authHeader(),
    });
    return response;
  }

  static async getCarById(id) {
    const response = await axios.get(SERVER_URL + "cars" + id, {
      headers: authHeader(),
    });
    return response;
  }
}

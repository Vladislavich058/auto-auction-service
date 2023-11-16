import axios from "axios";
import authHeader from "utils/authHeader";
const API_URL = "http://localhost:8080/api/admin/";

export default class AdminService {
  static async getManagers(limit = 10, page = 1) {
    const response = await axios.get(API_URL + "getManagers", {
      headers: authHeader(),
      params: {
        page: page,
        limit: limit,
      },
    });
    console.log(response.data);
    return response;
  }

  static async getClients(limit = 10, page = 1) {
    const response = await axios.get(API_URL + "getClients", {
      headers: authHeader(),
      params: {
        page: page,
        limit: limit,
      },
    });
    return response;
  }

  static async getAllManagers() {
    const response = await axios.get(API_URL + "getAllManagers", {
      headers: authHeader(),
    });
    return response;
  }

  static async getAllClients() {
    const response = await axios.get(API_URL + "getAllClients", {
      headers: authHeader(),
    });
    return response;
  }

  static async changeUserStatusById(id) {
    const response = await axios.get(API_URL + "changeUserStatusById/" + id, {
      headers: authHeader(),
    });
    return response;
  }

  static async deleteUserById(id) {
    const response = await axios.delete(API_URL + "deleteUserById/" + id, {
      headers: authHeader(),
    });
    return response;
  }

  static async addManager({ user }) {
    const response = await axios.post(API_URL + "addManager", user, {
      headers: authHeader(),
    });
    return response;
  }

  static async approveLotById(id) {
    const response = await axios.get(API_URL + "approveLotById/" + id, {
      headers: authHeader(),
    });
    return response;
  }

  static async refuseLotById(id) {
    const response = await axios.get(API_URL + "refuseLotById/" + id, {
      headers: authHeader(),
    });
    return response;
  }
}

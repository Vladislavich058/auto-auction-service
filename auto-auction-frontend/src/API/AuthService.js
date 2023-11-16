import axios from "axios";
import authHeader from "utils/authHeader";
const API_URL = "http://localhost:8080/api/auth/";

export default class AuthService {
  static async login({ user }) {
    const response = await axios.post(API_URL + "login", user);
    return response.data;
  }

  static async register({ user }) {
    const response = await axios.post(API_URL + "register", user);
    return response.data;
  }

  static async getCurrentUser() {
    const response = await axios.get(API_URL + "getCurrentUser", {
      headers: authHeader(),
    });
    return response.data;
  }

  static async updateCurrentUser({user}) {
    const response = await axios.patch(API_URL + "updateCurrentUser",user, {
      headers: authHeader(),
    });
    return response.data;
  }
}

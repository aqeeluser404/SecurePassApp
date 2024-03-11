import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

class UserService {
  static async createUser(USER) {
    const CREATE = '/api/user/create';
    try {
      const response = await axios.post(`${API_BASE_URL}${CREATE}`, USER);
      return response.data;
    } 
    catch (error) {
      throw error; 
    }
  }
  static async getUserByEmail(EMAIL) {
    const READ_BY_EMAIL = '/api/user/email';
    try {
      const response = await axios.get(`${API_BASE_URL}${READ_BY_EMAIL}/${EMAIL}`);
      return response;
    } 
    catch (error) {
      throw error; 
    }
  }
  static async getUserById(USER_ID) {
    const READ_BY_ID = '/api/user/id';
    try {
      const response = await axios.get(`${API_BASE_URL}${READ_BY_ID}/${USER_ID}`);
      return response;
    } 
    catch (error) {
      throw error; 
    }
  }
}

export default UserService;

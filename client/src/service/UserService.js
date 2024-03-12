import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

class UserService {
  static async createUser(USER, recaptchaToken) {
    const CREATE = '/api/user/create';
    try {
      // Add the reCAPTCHA token to the request body
      const requestBody = {
        ...USER,
        recaptchaToken: recaptchaToken
      };
      
      const response = await axios.post(`${API_BASE_URL}${CREATE}`, requestBody);
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
  static async checkDuplicateUser(field, value) {
    try {
      // Fetch all users
      const response = await axios.get(`${API_BASE_URL}/api/user`);
      const users = response.data;

      // Check if any user already has the provided value for the specified field
      const duplicateUser = users.find(user => user[field] === value);
      
      // Return true if a duplicate user is found, false otherwise
      return !!duplicateUser;
    } 
    catch (error) {
      throw error;
    }
  }
}

export default UserService;

import axios from 'axios';

class PassService {
    static async createPass(userId, pass) {
        try {
            const response = await axios.post(`http://localhost:5000/api/pass/create/${userId}`, pass);
            return response;
          } 
          catch (error) {
            throw error;
          }
    }
    static async getPassById(passId, userId) {
        try {
            const response = await axios.get(`http://localhost:5000/api/pass/read/${passId}/${userId}`);
            return response;
        } 
        catch (error) {
            throw error;
        }
    }
    static async deletePassById(passId, userId) {
        try {
            const response = await axios.delete(`http://localhost:5000/api/pass/delete/${passId}/${userId}`);
            return response.data;
        } 
        catch (error) {
            throw error;
        }
    }
    static async updatePassById(passId, passDetails, userId) {
        try {
          const response = await axios.put(`http://localhost:5000/api/pass/update/${passId}/${userId}`, passDetails);
          return response.data;
        } 
        catch (error) {
          throw error;
        }
      }
}

export default PassService;
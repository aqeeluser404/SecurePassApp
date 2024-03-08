import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  static async createResource(resourceItem) {
    const resourcePath = '/resource';
    try {
      const response = await axios.post(`${API_BASE_URL}${resourcePath}`, resourceItem);
      return response.data;
    } catch (error) {
      throw error; 
    }
  }

  static async readResource(resourceId) {
    const resourcePath = '/resource';
    try {
      const response = await axios.get(`${API_BASE_URL}${resourcePath}/${resourceId}`);
      return response.data;
    } catch (error) {
      throw error; 
    }
  }

  static async deleteResource(resourceId) {
    const resourcePath = '/resource';
    try {
      const response = await axios.delete(`${API_BASE_URL}${resourcePath}/${resourceId}`);
      return response;
    } catch (error) {
      throw error; 
    }
  }

  static async updateResource(resourceId, resourceItem) {
    const resourcePath = '/resource';
    try {
      const response = await axios.put(`${API_BASE_URL}${resourcePath}/${resourceId}`, resourceItem);
      return response;
    } catch (error) {
      throw error; 
    }
  }
}

export default ApiService;

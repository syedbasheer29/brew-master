import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export interface UserProfile {
  email: string;
  name: string;
  phone: string;
  address: string;
  savedBlends: string[];
  orders: any[];
  subscriptionPlan: string | null;
  paymentMethods: any[];
  notifications: any[];
}

class UserService {
  async getProfile(): Promise<UserProfile> {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/users/profile`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async getSavedBlends(): Promise<any[]> {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/saved-blends`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async getOrders(): Promise<any[]> {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async getSubscription(): Promise<any> {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/subscription`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async getPaymentMethods(): Promise<any[]> {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/payment-methods`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async getNotifications(): Promise<any[]> {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/notifications`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
}

export const userService = new UserService(); 
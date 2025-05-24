import apiClient from '@/lib/api-client';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  userUid: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export const CustomerService = {
  async getCustomers(): Promise<Customer[]> {
    const { data } = await apiClient.get('/customers');
    return data;
  },

  async getCustomer(id: number): Promise<Customer> {
    const { data } = await apiClient.get(`/customers/${id}`);
    return data;
  },

  async createCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> {
    const { data } = await apiClient.post('/customers', customer);
    return data;
  },

  async updateCustomer(id: number, customer: Partial<Customer>): Promise<Customer> {
    const { data } = await apiClient.put(`/customers/${id}`, customer);
    return data;
  },

  async deleteCustomer(id: number): Promise<void> {
    await apiClient.delete(`/customers/${id}`);
  }
};

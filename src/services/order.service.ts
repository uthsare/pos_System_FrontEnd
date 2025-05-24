import apiClient from '@/lib/api-client';

export interface Order {
  id: number;
  customerId: number;
  totalAmount: number;
  userUid: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export const OrderService = {
  async getOrders(): Promise<Order[]> {
    const { data } = await apiClient.get('/orders');
    return data;
  },

  async getOrder(id: number): Promise<Order> {
    const { data } = await apiClient.get(`/orders/${id}`);
    return data;
  },

  async createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const { data } = await apiClient.post('/orders', order);
    return data;
  },

  async updateOrder(id: number, order: Partial<Order>): Promise<Order> {
    const { data } = await apiClient.put(`/orders/${id}`, order);
    return data;
  },

  async deleteOrder(id: number): Promise<void> {
    await apiClient.delete(`/orders/${id}`);
  }
};

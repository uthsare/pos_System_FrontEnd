import apiClient from '@/lib/api-client';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  inStock: number;
  category?: string;
  userUid: string;
}

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    const { data } = await apiClient.get('/products');
    return data;
  },

  async getProduct(id: number): Promise<Product> {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const { data } = await apiClient.post('/products', product);
    return data;
  },

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const { data } = await apiClient.put(`/products/${id}`, product);
    return data;
  },

  async deleteProduct(id: number): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }
};

import axios from 'axios';

const API_URL = 'http://localhost:4000/api/products';

export const getProducts = async () => (await axios.get(API_URL)).data;

export const createProduct = async (product: any) =>
  await axios.post(API_URL, product);

export const updateProduct = async (id: number, product: any) =>
  await axios.put(`${API_URL}/${id}`, product);

export const deleteProduct = async (id: number) =>
  await axios.delete(`${API_URL}/${id}`);

export const recoverProduct = async (id: number) =>
  await axios.put(`${API_URL}/${id}/restore`);

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const createScheduling = (data: {
  licensePlate: string;
  date: string;
  time: string;
  type: string;
}) => api.post('/scheduling', data);

export const getSchedulings = () => api.get('/scheduling');

export const confirmScheduling = (id: string) =>
  api.patch(`/scheduling/confirmation/${id}`);

export const cancelScheduling = (id: string) =>
  api.patch(`/scheduling/cancel/${id}`);

export const getSlots = () =>
  api.get(`/slots`);

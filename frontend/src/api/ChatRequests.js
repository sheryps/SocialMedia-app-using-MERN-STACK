import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createChat = (body) => API.post('/chat', body);

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);

export const deleteChat = (chatId) => API.delete(`/chat/dele/${chatId}`);
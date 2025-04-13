import axios from "axios";

const API_URL = "http://localhost:3001/api/chats";

export const getChats = async (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

export const getMessages = async (chatId) => {
  return axios.get(`${API_URL}/${chatId}/messages`);
};

export const sendMessage = async (chatId, senderId, text) => {
  return axios.post(`${API_URL}/${chatId}/messages`, { senderId, text });
};
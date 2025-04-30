import axios from 'axios';
import { GenerateRequest, FinalizeRequest } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const generateTemplates = async (data: GenerateRequest) => {
  const res = await axios.post(`${API_BASE}/generate`, data);
  return res.data;
};

export const finalizeLetter = async (data: FinalizeRequest) => {
  const res = await axios.post(`${API_BASE}/finalize`, data);
  return res.data;
};

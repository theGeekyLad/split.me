import axios from 'axios';
import store, { showProgress, hideProgress } from '../store';

const API_URL = 'http://localhost:3001'; // Node backend

export const getGroups = async (apiKey) => {
  try {
    store.dispatch(showProgress());
    const response = await axios.get(`${API_URL}/get_groups?apiKey=${encodeURIComponent(apiKey)}`);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    store.dispatch(hideProgress());
  }
};

export const createExpense = async (expenseData, apiKey) => {
  try {
    store.dispatch(showProgress());
    const response = await axios.post(`${API_URL}/create_expense?apiKey=${encodeURIComponent(apiKey)}`, expenseData);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    store.dispatch(hideProgress());
  }
};

export const getGroupById = async (id, apiKey) => {
  try {
    store.dispatch(showProgress());
    const response = await axios.get(`${API_URL}/get_group/${id}?apiKey=${encodeURIComponent(apiKey)}`);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    store.dispatch(hideProgress());
  }
};
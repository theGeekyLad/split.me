import axios from 'axios';
import store, { showProgress, hideProgress } from '../store';

const API_URL = 'http://localhost:3001'; // Node backend

export const getGroups = async () => {
  try {
    store.dispatch(showProgress());
    const response = await axios.get(`${API_URL}/get_groups`);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    store.dispatch(hideProgress());
  }
};

export const getGroupById = async (id) => {
  try {
    store.dispatch(showProgress());
    const response = await axios.get(`${API_URL}/get_group/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    store.dispatch(hideProgress());
  }
};
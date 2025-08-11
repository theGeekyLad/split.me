import axios from 'axios';
import store, { showProgress, hideProgress } from '../store';

const API_URL = 'https://secure.splitwise.com';
const BEARER_TOKEN = 'u3ol04rmRnMsn1I6eA8zpAFSX1hJt9pJNHTBoX4h';


export const getGroups = async () => {
  try {
    store.dispatch(showProgress());
    const response = await axios.get(`${API_URL}/api/v3.0/get_groups`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    store.dispatch(hideProgress());
  }
};

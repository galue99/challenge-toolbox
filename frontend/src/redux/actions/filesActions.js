import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000'

export const fetchFiles = (fileName = '') => async dispatch => {
  dispatch({ type: 'FETCH_FILES_REQUEST' });
  try {
    const response = await axios.get(`${API_URL}/files/data`, {
      params: { fileName }
    });
    dispatch({ type: 'FETCH_FILES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_FILES_FAILURE', payload: error.message });
  }
};

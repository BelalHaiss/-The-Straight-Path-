import axios from 'axios';

export const fetcher = async (url, method = 'get', data = null) => {
  axios.defaults.baseURL = 'http://localhost:5000/api';
  try {
    const res = await axios({
      url,
      method,
      data,
      withCredentials: true
    });

    return res.data;
  } catch (error) {
    console.dir(error,'fetcher error');

    throw new Error(error.response.data || 'حدث خطا');
  }
};

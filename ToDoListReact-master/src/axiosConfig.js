
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5046',  // כתובת ה-API שלך
  headers: {
    'Content-Type': 'application/json',
  }
});

// הוספת טוקן לכל בקשה שנשלחת
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');  // קרא את הטוקן
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // הוסף את הטוקן להדר
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;


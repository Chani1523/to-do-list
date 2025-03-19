
import axios from './axiosConfig'; // שימוש בהגדרות axios שלך


  const service = {

    login: async (username, password) => {
      console.log(process.env.REACT_APP_API_URL);

      try {
        const res = await axios.post('/login', { username, password }, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        const token = res.data.token;
        console.log('Token received:', token); // הדפסת הטוקן
        localStorage.setItem('token', token); // שמירת ה-JWT ב-localStorage
        return token;
      } catch (err) {
        console.error("❌ Login failed", err.message);
        throw err;
      }
    },
  
    getTasks: async () => {
      try {
        const token = localStorage.getItem('token'); // קבלת הטוקן מ-localStorage
        if (!token) {
          throw new Error("❌ No token found");
        }
        
        const result = await axios.get('/item', {
          headers: { 
            'Authorization': `Bearer ${token}` // שליחת הטוקן בהגדרת ה-headers
          }
        });
        return result.data;
      } catch (error) {
        console.error("❌ Error fetching tasks:", error.message);
        throw error;
      }
    },

  addTask: async (name) => {
    try {
      const result = await axios.post('/item', { Name: name, IsComplete: false });
      return result.data;
    } catch (error) {
      console.error("❌ Error adding task:", error.message);
      throw error;
    }
  },

  setCompleted: async (IdItems, isComplete) => {
    if (IdItems && isComplete !== undefined) {
      try {
        // שליחה ל-API רק עם הסטטוס החדש
        const result = await axios.put(`/item/${IdItems}`, { IsComplete: isComplete });
        return result.data;
      } catch (error) {
        console.error("❌ Error updating task:", error.message);
        throw error;
      }
    } else {
      console.error("❌ Error: Missing values for update!");
    }
  },
  

  deleteTask: async (IdItems) => {
    try {
      const result = await axios.delete(`/item/${IdItems}`);
      return result.data;
    } catch (error) {
      console.error("❌ Error deleting task:", error.message);
      throw error;
    }
  }
};

export default service;

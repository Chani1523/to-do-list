
import React, { useState, useEffect } from 'react'; // אין שינוי פה
import { Routes, Route, Navigate } from 'react-router-dom'; // הורדנו את BrowserRouter отсюда!
import service from './service'; // אין שינוי

import Login from './Login';
import Register from './Register';
import TodoApp from './TodoApp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await service.getTasks();
        console.log('Tasks received:', tasksData);
        setTasks(tasksData);
      } catch (error) {
        console.error('❌ Error fetching tasks:', error);
      }
    };

    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <TodoApp /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;


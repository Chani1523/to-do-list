
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import service from './service';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      const token = await service.login(username, password);
      localStorage.setItem('token', token); 
      setMessage('התחברת בהצלחה!');
      onLogin(); // עדכון ה-App שהתחברת
      navigate('/'); // הפנייה לדף הראשי
      console.log(sessionStorage.getItem('jwt_token'));
      console.log(localStorage.getItem('jwt_token'));

    } catch (error) {
      console.error('❌ Error logging in:', error);
      setMessage('שגיאה בהתחברות, בדוק את הפרטים.');
    }
  };

  return (
    <div className="login">
      <h2>התחברות</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>שם משתמש:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>סיסמה:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">התחבר</button>
      </form>
      <p>{message}</p>
      <p>אין לך חשבון? <Link to="/register">הרשמה</Link></p>
    </div>
  );
}

export default Login;


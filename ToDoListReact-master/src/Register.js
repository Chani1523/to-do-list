
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axiosConfig';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/register', { username, password });
      console.log('Username:', username);
console.log('Password:', password);

      if (response.status === 200) {
        setMessage('נרשמת בהצלחה! התחבר עכשיו...');
        setTimeout(() => navigate('/login'), 2000); // מעבר לדף ההתחברות אחרי הרשמה
      }
    } catch (error) {
      console.error('❌ Error registering:', error);
      setMessage('שגיאה בהרשמה, נסה שוב.');
    }
  };

  return (
    <div className="register">
      <h2>הרשמה</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>שם משתמש:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>סיסמה:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">הירשם</button>
      </form>
      <p>{message}</p>
      <p>כבר יש לך חשבון? <Link to="/login">התחבר</Link></p>
    </div>
  );
}

export default Register;

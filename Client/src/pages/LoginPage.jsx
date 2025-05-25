import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/UserService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState({});

  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};
    if (!email.trim()) errors.email = 'Email is required';
    if (!password.trim()) errors.password = 'Password is required';
    setFieldError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      console.log(' Login success:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('type', data.type);
      localStorage.setItem('firstName', data.firstName);

      navigate('/dashboard');
    } catch (err) {
      console.error(' Login failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Log In</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldError((prev) => ({ ...prev, email: '' }));
              }}
              required
              style={styles.inputField}
            />
            {fieldError.email && <p style={styles.fieldError}>{fieldError.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldError((prev) => ({ ...prev, password: '' }));
              }}
              required
              style={styles.inputField}
            />
            {fieldError.password && <p style={styles.fieldError}>{fieldError.password}</p>}
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div style={styles.registerText}>
          <p>Don't have an account? <Link to="/register" style={styles.link}>Register</Link></p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f7f7f7',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '40px 50px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputField: {
    padding: '16px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  fieldError: {
    color: 'red',
    fontSize: '12px',
    textAlign: 'left',
    marginTop: '5px',
  },
  submitBtn: {
    padding: '14px',
    fontSize: '18px',
    backgroundColor: '#4A90E2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontWeight: '500',
  },
  registerText: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#4A90E2',
    textDecoration: 'none',
    fontWeight: '500',
    marginTop: '10px',
    display: 'inline-block',
  },
};
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/UserService';
import { toast } from 'react-toastify';

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
    setError('');
    try {
      const { data } = await loginUser({ email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('type', data.type);
      localStorage.setItem('firstName', data.firstName);

      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(msg);
      toast.error(msg);
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
              style={styles.inputField}
              disabled={loading}
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
              style={styles.inputField}
              disabled={loading}
            />
            {fieldError.password && <p style={styles.fieldError}>{fieldError.password}</p>}
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div style={styles.registerText}>
          <p>
            Don't have an account?{' '}
            <Link to="/register" style={styles.link}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  // container: {
  //   backgroundColor: '#f7f7f7',
  //   height: '100vh',
  //   padding: '20px',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  container: {
    backgroundColor: '#f7f7f7',
    height: '85dvh', // Modern alternative to handle mobile browsers correctly
    overflow: 'hidden', // Prevent scrollbars
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '50px 60px',
    borderRadius: '20px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '35px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputField: {
    padding: '18px',
    fontSize: '17px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  fieldError: {
    color: 'red',
    fontSize: '13px',
    textAlign: 'left',
    marginTop: '6px',
  },
  submitBtn: {
    padding: '16px',
    fontSize: '18px',
    backgroundColor: '#4A90E2',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontWeight: '600',
  },
  registerText: {
    marginTop: '20px',
    fontSize: '15px',
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
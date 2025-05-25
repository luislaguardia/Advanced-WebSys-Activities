import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// mnew page for lab act 5

export default function WelcomePage() {
  const query = new URLSearchParams(useLocation().search);
  const email = query.get('email');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); 
    }, 3000); // tinmers to adjustr..
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.welcomeBox}>
        <h2 style={styles.heading}>Welcome!</h2>
        <p style={styles.emailText}>Your email: <strong>{email}</strong></p>
        <p style={styles.redirectText}>Redirecting to homepage...</p>
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
  welcomeBox: {
    backgroundColor: '#fff',
    padding: '40px 50px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  },
  emailText: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
  },
  redirectText: {
    fontSize: '16px',
    color: '#888',
  },
};

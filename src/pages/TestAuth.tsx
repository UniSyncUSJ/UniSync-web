import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import style from '../styles/TestAuth.module.scss';

function TestAuth() {
  const { token, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.title}>Authentication Test Page</h1>
        
        <div className={style.statusSection}>
          <h2 className={style.statusTitle}>Authentication Status</h2>
          <div className={style.statusItem}>
            <span>Is Authenticated:</span>
            <span style={{ marginLeft: '0.5rem' }}>
              {isAuthenticated ? '✅ Yes' : '❌ No'}
            </span>
          </div>
          <div className={style.statusItem}>
            <span>Token:</span>
            <span style={{ marginLeft: '0.5rem' }}>
              {token ? '✅ Present' : '❌ Not Present'}
            </span>
          </div>
          
          {token && (
            <div className={style.tokenContainer}>
              <div className={style.statusTitle}>JWT Token</div>
              <div className={style.tokenText}>{token}</div>
            </div>
          )}
        </div>

        <div className={style.buttonGroup}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')}
            sx={{
              background: '#603dd9',
              '&:hover': { background: '#6215d7' }
            }}
          >
            Go to Home
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TestAuth; 
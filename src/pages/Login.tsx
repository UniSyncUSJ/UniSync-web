import style from '../styles/Login.module.scss'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UniSyncInput from '../Components/UniSyncInput';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email and Password are required!");
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiClient('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      login(data.token);
      
      // Redirect to the page they tried to visit or test-auth page
      const from = location.state?.from?.pathname || '/test-auth';
      navigate(from, { replace: true });
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.background}>
      <div className={style.mainWindow}>
        <div className={style.left}>
          <div className={style.formContainer}>
            <p className={style.heading}>Login</p>
            <p>Welcome to uniSync</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Box component="form" sx={{ '& .MuiTextField-root': { my: 0.5, width: '100%' } }} noValidate autoComplete="on" className={style.inputGroup}>
              <Box sx={{ display: 'flex', flexDirection:'row', alignItems: 'center', maxWidth:'100%'}}>
                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <UniSyncInput 
                  fullWidth 
                  id='outlined' 
                  label='Email' 
                  type='email' 
                  autoComplete='email' 
                  size='small' 
                  name='email' 
                  value={formData.email} 
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection:'row', alignItems: 'center', width:'100%'}}>
                <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <FormControl sx={{ my: 0.5, width: '100%' }} variant="outlined">
                  <UniSyncInput
                    id="outlined-adornment-password"
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? 'hide the password' : 'display the password'}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                          disabled={isLoading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
            </Box>
            <div className={style.bottomContainer}>
              <Link to="/" className={style.forgotPassword}>Forgot password ?</Link>
              <Button 
                variant="contained" 
                sx={{background:'#603dd9', '&:hover': {background:'#6215d7'}}} 
                onClick={handleSubmit} 
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
            <p className={style.register}>Not a member ? <Link to='signup' className={style.registerLink}>signUp</Link> now !</p>
          </div>
        </div>
        <div className={style.right} />
      </div>
    </div>
  );
}

export default Login;
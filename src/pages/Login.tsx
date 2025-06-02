import TextField from '@mui/material/TextField';
import style from '../styles/Login.module.scss'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import UniSyncInput from '../Components/UniSyncInput/UniSyncInput';


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.email || !formData.password) {
    alert("Email and Password are required!");
    return;
  }
  console.log(formData)
};

  return (
    <div className={style.background}>
      <div className={style.mainWindow}>

        <div className={style.left}>
          <div className={style.formContainer}>
            <p className={style.heading}>Login</p>
            <p>Welcome to uniSync</p>

            <Box component="form" sx={{ '& .MuiTextField-root': { my: 0.5, width: '100%' } }} noValidate autoComplete="on" className={style.inputGroup}>
              <Box sx={{ display: 'flex', flexDirection:'row', alignItems: 'center', maxWidth:'100%'}}>
                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <UniSyncInput fullWidth id='outlined' label='Email' type='email' autoComplete='email' size='small' name='email' value={formData.email} onChange={handleChange} />
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
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? 'hide the password' : 'display the password'}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
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
              <Button variant="contained" sx={{background:'#603dd9', '&:hover': {background:'#6215d7'}}} onClick={handleSubmit} fullWidth>Sign In</Button>
            </div>
            <p className={style.register}>Not a member ? <Link to='singup' className={style.registerLink}>signUp</Link> now !</p>
          </div>
        </div>
        <div className={style.right} />
      </div>
    </div>
  )
}

export default Login;
import TextField from '@mui/material/TextField';
import style from '../styles/SignUp.module.scss'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';


function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={style.background}>
      <div className={style.mainWindow}>

        <div className={style.left}>
          <div className={style.formContainer}>
            <h2>Login</h2>
            <p>Welcome to uniSync</p>

            <Box component="form" sx={{ '& .MuiTextField-root': { my: 0.5, width: '100%' } }} noValidate autoComplete="on" className={style.inputGroup}>
              <Box sx={{ display: 'flex', flexDirection:'row', alignItems: 'center', maxWidth:'100%'}}>
                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth id="outlined" label="Email" type='email' autoComplete='email' size='small' />
              </Box>

              <Box sx={{ display: 'flex', flexDirection:'row', alignItems: 'center', width:'100%'}}>
                <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <FormControl sx={{ my: 0.5, width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" size='small'>Password</InputLabel> 
                    <OutlinedInput
                      size='small'
                      fullWidth
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                </FormControl>
              </Box>
            </Box>
            <div className={style.bottomContainer}>
              <Link to="/" className={style.forgotPassword}>Forgot password ?</Link>
              <Button variant="contained" sx={{background:'#603dd9', '&:hover': {background:'#6215d7'}}} fullWidth>Sign In</Button>
            </div>
          </div>
        </div>
        <div className={style.right} />
      </div>
    </div>
  )
}

export default SignUp;
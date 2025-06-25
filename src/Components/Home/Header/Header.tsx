import AccountCircleIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import style from './Header.module.scss'
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return <div className={style.header}>
    <p className={style.logo}>UniSync</p>
    <div className={style.navBar}>
      <Link to='/' className={style.navLink}>Events</Link> <span className={style.separator}>|</span>
      <Link to='/'className={style.navLink}>Marketplace</Link> <span className={style.separator}>|</span>
      <Link to='/' className={style.navLink}>My Calendar</Link> <span className={style.separator}>|</span>
      <Link to='/' className={style.navLink}>Discover</Link>
    </div>
    <div className={style.userActions}>
      <AccountCircleIcon className={style.profile} fontSize='large' sx={{color:'white'}}/>
      <Button size='medium' color='error' variant='contained' onClick={handleLogout}>Logout</Button>
    </div>
  </div>
}

export default Header;
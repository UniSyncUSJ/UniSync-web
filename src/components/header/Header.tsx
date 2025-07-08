import { Link } from 'react-router-dom';
import style from './header.module.scss'

interface Props {
  isAuthenticated : boolean
}

const Header = (props : Props) => {
  return (
    <header className={style.header}>
      <div className={style.logo}>UniSync</div>

      <nav className={style.navBar}>
        <a href="#features" className={style.navLink}>
          Features
        </a>
        <span className={style.separator}>•</span>
        <a href="#about" className={style.navLink}>
          About
        </a>
        <span className={style.separator}>•</span>
        <a href="#contact" className={style.navLink}>
          Contact
        </a>
      </nav>

      <div className={style.userActions}>
        { !props.isAuthenticated ? (
          <> 
            <Link to='/student/signin' className={style.actionButton} >
              SignIn
            </Link>
            <Link to='/student/signup' className={style.actionButton} >
              SignUp
            </Link>
          </> 
        ) : (
          <Link to='/student/signup' className={style.signOut} >
            SignOut
          </Link>
        )
      }
      </div>
    </header>
  )
}

export default Header;
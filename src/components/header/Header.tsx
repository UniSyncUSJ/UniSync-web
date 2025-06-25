import style from './header.module.scss'

const Header = () => {
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
        <button
          className={style.loginBtn}
          // onClick={() => openModal("signin")}
        >
          SignIn
        </button>
        <button
          className={style.signupBtn}
          // onClick={() => openModal("signup")}
        >
          SignUp
        </button>
      </div>
    </header>
  )
}

export default Header;
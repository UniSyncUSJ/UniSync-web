import { Link } from "react-router-dom";
import style from '../styles/NotFound.module.scss'

function NotFound() {
  return (
    <div className={style.container}>
      <h1 className={style.number}>404</h1>
      <p className={style.mainText}>Page Not Found</p>
      <p className={style.paragraph}>The page you are looking for doesn't exist or another error occured. Got to <Link to={"/home"}>Home</Link> page.</p>
    </div> 
  )
}

export default NotFound;
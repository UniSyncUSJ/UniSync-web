import AccountCircleIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import style from "./Header.module.scss";
import { logOut } from "../../../../utils/user/auth";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  function handleLogout() {
    logOut();
  }

  return (
    <div className={style.header}>
      <p className={style.logo}>
        <Link to="/student-home" className={style.logoLink}>
          UniSync
        </Link>
      </p>

      <div className={style.navBar}>
        <Link
          to="/student-home"
          className={`${style.navLink} ${
            isActive("/student-home") ? style.active : ""
          }`}
        >
          Events
        </Link>
        <span className={style.separator}>|</span>
        <Link
          to="/"
          className={`${style.navLink} ${isActive("/") ? style.active : ""}`}
        >
          Marketplace
        </Link>
        <span className={style.separator}>|</span>
        <Link
          to="/student-home/my-events"
          className={`${style.navLink} ${
            isActive("/student-home/my-events") ? style.active : ""
          }`}
        >
          My Events
        </Link>
        <span className={style.separator}>|</span>
        <Link
          to="/discover"
          className={`${style.navLink} ${
            isActive("/discover") ? style.active : ""
          }`}
        >
          Discover
        </Link>
      </div>

      <div className={style.userActions}>
        <AccountCircleIcon
          className={style.profile}
          fontSize="large"
          sx={{ color: "white" }}
        />
        <Button
          onClick={handleLogout}
          size="medium"
          color="error"
          variant="contained"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;

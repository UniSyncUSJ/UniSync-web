import AccountCircleIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import style from "./Header.module.scss";
import { logOut } from "../../../../../utils/user/auth";

const Header = () => {
  function handleLogout() {
    logOut();
  }
  return (
    <div className={style.header}>
      <p className={style.logo}>UniSync</p>
      <div className={style.navBar}>
        <Link to="/" className={style.navLink}>
          Events
        </Link>{" "}
        <span className={style.separator}>|</span>
        <Link to="/" className={style.navLink}>
          Marketplace
        </Link>{" "}
        <span className={style.separator}>|</span>
        <Link to="/" className={style.navLink}>
          My Calendar
        </Link>{" "}
        <span className={style.separator}>|</span>
        <Link to="/" className={style.navLink}>
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

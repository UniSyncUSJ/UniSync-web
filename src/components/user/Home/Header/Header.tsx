import AccountCircleIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation } from "react-router-dom";
import { Button, IconButton, Badge } from "@mui/material";
import style from "./Header.module.scss";
import { logOut } from "../../../../utils/user/auth";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userCart = useSelector((state: any) => state.userCart.cart);
  function handleLogout() {
    logOut();
  }

  // Mock cart items count - replace with actual cart state
  const cartItemsCount = userCart.length;

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
          to="/student-home/my-events"
          className={`${style.navLink} ${
            isActive("/student-home/my-events") ? style.active : ""
          }`}
        >
          My Events
        </Link>
        <span className={style.separator}>|</span>
        <Link
          to="/student-home/marketplace"
          className={`${style.navLink} ${
            isActive("/student-home/marketplace") ? style.active : ""
          }`}
        >
          Marketplace
        </Link>
        <span className={style.separator}>|</span>
        {/* <Link
          to="/student-home/my-events"
          className={`${style.navLink} ${
            isActive("/student-home/my-events") ? style.active : ""
          }`}
        >
          My Events
        </Link> */}
        {/* <span className={style.separator}>|</span>
        <Link
          to="/student-home/academics"
          className={`${style.navLink} ${
            isActive("/student-home/academics") ? style.active : ""
          }`}
        >
          Academics
        </Link> */}
        {/* <span className={style.separator}>|</span> */}
        <Link
          to="/student-home/my-schedule"
          className={`${style.navLink} ${
            isActive("/student-home/my-schedule") ? style.active : ""
          }`}
        >
          My-schedule
        </Link>
      </div>

      <div className={style.userActions}>
        <div className={style.cartSection}>
          <IconButton
            component={Link}
            to="/student-home/my-cart"
            className={style.cartButton}
            size="large"
          >
            <Badge
              badgeContent={cartItemsCount}
              color="error"
              className={style.cartBadge}
            >
              <ShoppingCartIcon sx={{ color: "white", fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>

        <div className={style.profileSection}>
          <AccountCircleIcon
            className={style.profile}
            fontSize="large"
            sx={{ color: "white" }}
          />
        </div>

        <Button
          onClick={handleLogout}
          size="medium"
          color="error"
          variant="contained"
          className={style.logoutButton}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;

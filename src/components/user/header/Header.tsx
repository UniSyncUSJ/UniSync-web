/* eslint-disable @typescript-eslint/no-unused-vars */
import style from "./header.module.scss";
import React, { useRef, useState } from "react";
import Modal from "../../common/modal/Modal";
import { Link } from "react-router-dom";
import { Shield, User } from "lucide-react";
type ModalHandle = {
  open: () => void;
  close: () => void;
};

const Header = () => {
  const modal = useRef<ModalHandle | null>(null);
  const [authMode, setAuthMode] = useState("signin"); // 'login' or 'signup'
  const [showUserType, setShowUserType] = useState(false);
  const openModal = (mode: React.SetStateAction<string>) => {
    setAuthMode(mode);
    setShowUserType(true);
    modal.current?.open();
  };
  return (
    <>
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
            onClick={() => openModal("signin")}
          >
            SignIn
          </button>
          <button
            className={style.signupBtn}
            onClick={() => openModal("signup")}
          >
            SignUp
          </button>
        </div>
      </header>

      {/* User Type Modal */}
      <Modal ref={modal}>
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h3>Choose Account Type</h3>
            <p>Are you a student or representing an organization?</p>

            <div className={style.userTypeOptions}>
              <Link to={`student/${authMode}`} className={style.userTypeBtn}>
                <User size={24} />
                <span>Student</span>
                <p>Access events, updates, and academic resources</p>
              </Link>

              <Link to={`admin/${authMode}`} className={style.userTypeBtn}>
                <Shield size={24} />
                <span>Organization Admin</span>
                <p>Manage events, send updates, and organize activities</p>
              </Link>
            </div>

            <button
              className={style.closeModal}
              onClick={() => modal.current?.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;

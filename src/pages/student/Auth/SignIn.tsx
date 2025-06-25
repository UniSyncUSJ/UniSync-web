import React, { useState } from "react";
import { Link, Form, useNavigate } from "react-router-dom";
import styles from "./signIn.module.scss";

// Custom Input Component
interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const CustomInput: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  required = false,
  value,
  onChange,
  icon,
}) => {
  return (
    <div className={styles.inputGroup}>
      {icon && <div className={styles.inputIcon}>{icon}</div>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={styles.customInput}
      />
    </div>
  );
};

// Custom Password Input Component
interface PasswordInputProps {
  name: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  placeholder,
  required = false,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputGroup}>
      <div className={styles.inputIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <circle cx="12" cy="16" r="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`${styles.customInput} ${styles.passwordInput}`}
      />
      <button
        type="button"
        className={styles.passwordToggle}
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        )}
      </button>
    </div>
  );
};

// Custom Button Component
interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.customButton} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Main SignIn Component
const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    if(formData.email == 'student@unisync.com' && formData.password == 'admin') {
      navigate('/student/home');
    }
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signinContent}>
        <div className={styles.signinFormSection}>
          <div className={styles.signinFormContainer}>
            <div className={styles.signinHeader}>
              <h1 className={styles.signinTitle}>Login</h1>
              <p className={styles.signinSubtitle}>Welcome to UniSync</p>
            </div>

            <Form className={styles.signinForm}>
              <div className={styles.formFields}>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  }
                />

                <PasswordInput
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.signinActions}>
                <Link to="#" className={styles.forgotPasswordLink}>
                  Forgot password?
                </Link>
                
                <CustomButton className={styles.signinButton} onClick={handleLogin}>
                  Sign In
                </CustomButton>
                
                <div className={styles.signupPrompt}>
                  <span>Don't have an account? </span>
                  <Link to="/student/signup" className={styles.signupLink}>
                    Sign Up
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>

        <div className={styles.signinVisualSection}>
          <div className={styles.visualContent}>
            <div className={styles.floatingElements}>
              <div className={`${styles.floatingCard} ${styles.card1}`}>
                <div className={styles.cardIcon}>📅</div>
                <span>Upcoming Events</span>
              </div>
              <div className={`${styles.floatingCard} ${styles.card2}`}>
                <div className={styles.cardIcon}>🔔</div>
                <span>Live Updates</span>
              </div>
              <div className={`${styles.floatingCard} ${styles.card3}`}>
                <div className={styles.cardIcon}>📚</div>
                <span>Academic Resources</span>
              </div>
            </div>
            <div className={styles.centralIllustration}>
              <div className={styles.syncCircle}>
                <div className={`${styles.syncDot} ${styles.dot1}`}></div>
                <div className={`${styles.syncDot} ${styles.dot2}`}></div>
                <div className={`${styles.syncDot} ${styles.dot3}`}></div>
                <div className={styles.syncPulse}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
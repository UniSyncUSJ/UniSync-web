import React, { useState } from "react";
import { Link, Form, useNavigate } from "react-router-dom";
import styles from "./signIn.module.scss";
import CustomInput from "../../../../components/Auth/CustomInput";
import PasswordInput from "../../../../components/Auth/PasswordInput";
import CustomButton from "../../../../components/Auth/CustomButton";
import { Mail } from 'lucide-react';

// Main SignIn Component
const SignIn = () => {
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

  const Animation = () => {
    return (
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
    )
  }

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
                  icon={Mail}
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
                
                <CustomButton title="Sign In" type="button" onClick={handleLogin} />
                
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

        {Animation()} 
        
      </div>
    </div>
  );
};

export default SignIn;
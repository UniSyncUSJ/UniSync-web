import { Form, useNavigate } from "react-router-dom";
import styles from "./Admin.module.scss";
import { useEffect, useState } from "react";

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('test1')
    if(email === 'admin@unisync.com' && pass === 'admin') {
      console.log('test2')
      navigate('/home');
    }
  };

  useEffect(() => {
    console.log('email:', email);
    console.log('pass:', pass);
  }, [email, pass])

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Admin Login</h2>
        <Form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className={styles.input}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button className={styles.submitButton} onClick={handleLogin}>
            Log In
          </button>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin;
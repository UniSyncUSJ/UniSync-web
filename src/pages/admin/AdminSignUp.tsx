import React from "react";
import { Form, Link } from "react-router-dom";
import styles from "./adminSignUp.module.scss"; // Adjust the path as necessary

function AdminSignUp() {
  return (
    <div className={styles.background}>
      <div className={styles.pageContainer}>
        <div className={styles.contentArea}>
          <h2>Create Admin Account</h2>
          <Form method="post">
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div>
              <label htmlFor="university">University:</label>
              <input type="text" id="university" name="university" required />
            </div>
            <div>
              <label htmlFor="club">Club:</label>
              <input type="text" id="club" name="club" required />
            </div>

            <button type="submit">Create Account</button>
          </Form>
          <h2>
            Already have an account? <Link to="/admin/login">Log in</Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AdminSignUp;

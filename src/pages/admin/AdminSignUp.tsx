import React from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import styles from "./adminSignUp.module.scss"; // Adjust the path as necessary

export default function AdminSignUp() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    university: "",
    club: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  React.useEffect(() => {
    // Reset form data on component mount
    setFormData({
      email: "",
      password: "",
      university: "",
      club: "",
    });
  }, []);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      formData.email === "student@unisync.com" &&
      formData.password === "admin"
    ) {
      navigate("/student/home");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.pageContainer}>
        <div className={styles.contentArea}>
          <h2>Create Admin Account</h2>
          <Form method="post">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="university">University:</label>
              <input
                type="text"
                id="university"
                name="university"
                required
                value={formData.university}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="club">Club:</label>
              <input
                type="text"
                id="club"
                name="club"
                required
                value={formData.club}
                onChange={handleChange}
              />
            </div>

            <button type="submit" onClick={handleLogin}>
              Create Account
            </button>
          </Form>
          <h2>
            Already have an account? <Link to="/admin/login">Log in</Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

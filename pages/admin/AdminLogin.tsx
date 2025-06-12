import React from "react";
import { Form } from "react-router-dom";

function AdminLogin() {
  return (
    <div>
      <h2>Admin Login</h2>
      <Form method="post" action="/admin/login">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Log In</button>
      </Form>
    </div>
  );
}

export default AdminLogin;

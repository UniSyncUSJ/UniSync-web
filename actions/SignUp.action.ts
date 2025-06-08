import { redirect } from "react-router-dom";
import { getRole } from "../utils/user/auth";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const authData = {
    firstName: formData.get("firstName")?.toString() || "",
    lastName: formData.get("lastName")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    university: formData.get("university")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
  };

  // Here you can handle the signup logic, e.g., sending data to an API
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (!response.ok) {
    throw new Response("Failed to sign up", { status: 500 });
  }

  const resData = await response.json();
  if (resData.error) {
    throw new Response(resData.error, { status: 400 });
  }
  const token = resData.token;
  localStorage.setItem("token", token);
  // For now, we will just return the entered values
  const role = getRole();
  if (role === "admin") {
    return redirect("/admin-home");
  } else {
    return redirect("/student-home"); // Redirect to home page after successful signup
  }
}

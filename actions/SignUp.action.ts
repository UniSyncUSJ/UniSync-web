import { redirect } from "react-router-dom";
import { getRole } from "../utils/user/auth";
import axios from "axios";

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

  try {
    const response = await axios.post(
      "http://localhost:8080/auth/login",
      authData
    );

    if (!response.data) {
      throw new Error("Failed to sign up");
    }

    const data = response.data;

    if (data.error) {
      throw new Error(data.error);
    }
    localStorage.setItem("token", data.token);
    const role = getRole();
    if (role === "admin") {
      return redirect("/admin-home");
    } else {
      return redirect("/student-home");
    }
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
}

import axios from "axios";
import { redirect } from "react-router-dom";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
    university: formData.get("university"),
    club: formData.get("club"),
  };

  if (
    !authData.email ||
    !authData.password ||
    !authData.university ||
    !authData.club
  ) {
    return { error: "All fields are required." };
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/auth/login",
      authData
    );
    if (!response.data) {
      throw new Error("Failed to create admin account.");
    }

    const data = response.data;
    if (data.error) {
      throw new Error(data.error);
    }
    localStorage.setItem("token", data.token);
    return redirect("/admin-home");
  } catch (error) {
    console.error("Error signing up:", error);
    return { error: "Failed to create admin account. Please try again." };
  }
}

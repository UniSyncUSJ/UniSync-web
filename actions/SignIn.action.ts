import { redirect } from "react-router-dom";
import { getRole } from "../utils/user/auth";

export async function action({ request }: { request: Request }) {
  console.log("SignIn action called");
  const formData = await request.formData();

  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Backend returned non-OK status:", response.status);
      throw new Error("Failed to sign in");
    }

    const data = await response.json();
    console.log("Token received:", data.accessToken);
    localStorage.setItem("token", data.accessToken);
    const role = getRole();
    if (role === "admin") {
      return redirect("/admin-home");
    } else {
      return redirect("/student-home");
    }
  } catch (error) {
    console.error("Error signing in:", error);
  }
}

import { redirect } from "react-router-dom";
import { getRole } from "../utils/user/auth";
import axios from "axios";

export async function action({ request }: { request: Request }) {
  console.log("SignIn action called");
  const formData = await request.formData();

  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/signin",
      authData
    );

    const data = response.data;
    localStorage.setItem("token", data.accessToken);

    const role = getRole();
    if (role === "admin") return redirect("/admin-home");
    else return redirect("/student-home");
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
}

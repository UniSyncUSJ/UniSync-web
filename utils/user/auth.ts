import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  email: string;
  role: "admin" | "user";
  exp: number;
  iat: number;
}

export function getTokenAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  return token;
}

export function getRole() {
  const token = getTokenAuth();
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.role;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export function tokenLoader() {
  return getTokenAuth();
}

export function checkAuthLoader() {
  const token = getTokenAuth();
  if (!token) {
    return redirect("/signin");
  }
  console.log("Token exists, user is authenticated", token);
  return null;
}

export function logOut() {
  localStorage.removeItem("token");
  return redirect("/signin");
}

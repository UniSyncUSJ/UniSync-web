import { redirect } from "react-router-dom";

export function getTokenAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  return token;
}

export function tokenLoader() {
  return getTokenAuth();
}

export function checkAuthLoader() {
  const token = getTokenAuth();
  if (!token) {
    return redirect("/signin");
  }

  return null;
}

export function logOut() {
  localStorage.removeItem("token");
  return redirect("/signin");
}

import TextField from "@mui/material/TextField";
import style from "../../styles/SignUp.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import { Link, Form, redirect } from "react-router-dom";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className={style.background}>
      <div className={style.mainWindow}>
        <div className={style.left}>
          <div className={style.formContainer}>
            <h2>Login</h2>
            <p>Welcome to uniSync</p>

            <Form
              method="post"
              className={style.inputGroup}
              style={{ width: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  maxWidth: "100%",
                }}
              >
                <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  name="email"
                  fullWidth
                  label="Email"
                  type="email"
                  autoComplete="email"
                  size="small"
                  required
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <FormControl sx={{ my: 0.5, width: "100%" }} variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    size="small"
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    size="small"
                    fullWidth
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                          aria-label={
                            showPassword ? "hide password" : "show password"
                          }
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    required
                  />
                </FormControl>
              </Box>

              <div className={style.bottomContainer}>
                <Link to="/" className={style.forgotPassword}>
                  Forgot password?
                </Link>
                <Link to="/signup" className={style.signUp}>
                  Don't have an account?
                </Link>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "#603dd9",
                    "&:hover": { background: "#6215d7" },
                  }}
                  fullWidth
                >
                  Sign In
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div className={style.right} />
      </div>
    </div>
  );
}

export default SignIn;

// Connected to react-router-dom <Form method="post" />
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
    return redirect("/student-home");
  } catch (error) {
    console.error("Error signing in:", error);
  }
}

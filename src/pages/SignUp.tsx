import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useActionState } from "react";
import { Link } from "react-router-dom";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";

import style from "../styles/SignUp.module.scss";
import {
  hasMinLength,
  isEmail,
  isEqualToOtherValue,
  isNotEmpty,
} from "../utils/validation";

type SignupFormState = {
  errors: string[] | null;
  success?: boolean;
  enteredValues?: Record<string, string | string[] | boolean>;
};

function SignUp() {
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();

  function signupAction(
    prevFormState: SignupFormState,
    formData: FormData
  ): SignupFormState {
    const firstName = formData.get("firstName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const university = formData.get("university")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";

    const errors: string[] = [];

    if (!isNotEmpty(firstName)) errors.push("First name cannot be empty.");
    if (!isNotEmpty(lastName)) errors.push("Last name cannot be empty.");
    if (!isNotEmpty(university)) errors.push("University cannot be empty.");
    if (!isNotEmpty(password) || !hasMinLength(password, 8))
      errors.push("Password must be at least 8 characters long.");
    if (!isEqualToOtherValue(password, confirmPassword))
      errors.push("Passwords do not match.");
    if (!isEmail(email)) errors.push("Please enter a valid email address.");

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: { firstName, lastName, email, university },
      };
    }

    return { errors: null, success: true };
  }

  const [formState, formAction] = useActionState<SignupFormState, FormData>(
    signupAction,
    { errors: null }
  );

  if (formState.success) {
    formRef.current?.reset();
  }

  return (
    <div className={style.background}>
      <div className={style.mainWindow}>
        <div className={style.left}>
          <div className={style.formContainer}>
            <h2>Create Account</h2>
            <p>Join uniSync today</p>

            <form ref={formRef} action={formAction} autoComplete="on">
              <Box
                sx={{ "& .MuiTextField-root": { my: 0.5, width: "100%" } }}
                className={style.inputGroup}
              >
                {/* First Name */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon sx={{ color: "action.active", mr: 1 }} />
                  <TextField
                    name="firstName"
                    label="First Name"
                    type="text"
                    autoComplete="given-name"
                    size="small"
                    required
                    defaultValue={formState.enteredValues?.firstName || ""}
                  />
                </Box>

                {/* Last Name */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon sx={{ color: "action.active", mr: 1 }} />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    type="text"
                    autoComplete="family-name"
                    size="small"
                    required
                    defaultValue={formState.enteredValues?.lastName || ""}
                  />
                </Box>

                {/* Email */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <EmailIcon sx={{ color: "action.active", mr: 1 }} />
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    size="small"
                    required
                    defaultValue={formState.enteredValues?.email || ""}
                  />
                </Box>

                {/* University */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <SchoolIcon sx={{ color: "action.active", mr: 1 }} />
                  <TextField
                    name="university"
                    label="University"
                    type="text"
                    autoComplete="organization"
                    size="small"
                    required
                    defaultValue={formState.enteredValues?.university || ""}
                  />
                </Box>

                {/* Password */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <KeyIcon sx={{ color: "action.active", mr: 1 }} />
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="password" size="small">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Box>

                {/* Confirm Password */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <KeyIcon sx={{ color: "action.active", mr: 1 }} />
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="confirmPassword" size="small">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      name="confirmPassword"
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                  </FormControl>
                </Box>
              </Box>

              <div className={style.bottomContainer}>
                <Link to="/signin" className={style.forgotPassword}>
                  Already have an account? Sign in
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
                  Create Account
                </Button>
              </div>
            </form>
            {formState.errors && (
              <ul style={{ color: "red", marginBottom: "1rem" }}>
                {formState.errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={style.right} />
      </div>
    </div>
  );
}

export default SignUp;

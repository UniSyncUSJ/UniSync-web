import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import {
  VisibilityOff,
  Visibility,
  Key as KeyIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

import style from "../styles/SignUp.module.scss";

type ActionError = { error?: string };

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const actionData = useActionData() as ActionError | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <div className={style.background}>
      <div className={style.mainWindow}>
        <div className={style.left}>
          <div className={style.formContainer}>
            <h2>Create Account</h2>
            <p>Join uniSync today</p>

            <Form method="post" autoComplete="on">
              <Box sx={{ "& .MuiTextField-root": { my: 0.5, width: "100%" } }}>
                {/* First Name */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <TextField
                    name="firstName"
                    label="First Name"
                    required
                    autoComplete="given-name"
                    size="small"
                  />
                </Box>

                {/* Last Name */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    required
                    autoComplete="family-name"
                    size="small"
                  />
                </Box>

                {/* Email */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmailIcon sx={{ mr: 1 }} />
                  <TextField
                    name="email"
                    label="Email"
                    required
                    autoComplete="email"
                    size="small"
                  />
                </Box>

                {/* University */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SchoolIcon sx={{ mr: 1 }} />
                  <TextField
                    name="university"
                    label="University"
                    required
                    size="small"
                    autoComplete="organization"
                  />
                </Box>

                {/* Password */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <KeyIcon sx={{ mr: 1 }} />
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel size="small">Password</InputLabel>
                    <OutlinedInput
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={togglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Box>

                {/* Confirm Password */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <KeyIcon sx={{ mr: 1 }} />
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel size="small">Confirm Password</InputLabel>
                    <OutlinedInput
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={toggleConfirmPassword}
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
                  fullWidth
                  sx={{
                    background: "#603dd9",
                    "&:hover": { background: "#6215d7" },
                    mt: 1,
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </Form>

            {actionData?.error && (
              <p style={{ color: "red", marginTop: "1rem" }}>
                {actionData.error}
              </p>
            )}
          </div>
        </div>
        <div className={style.right} />
      </div>
    </div>
  );
}

export default SignUp;

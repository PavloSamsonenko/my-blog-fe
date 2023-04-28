import "./sign-up-page.css";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";

const theme = createTheme();

export default function SignUp() {
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    passwordMismatch: "",
  });

  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  const handleLoginRedirect = () => routeChange("/login");
  const handlePasswordResetRedirect = () => routeChange("/password/reset");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateFields()) {
      fetchSingIn();
    }
  };

  const fetchSingIn = () => {
    fetch("http://localhost:8080/a/rest/accounts/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.email) {
          for (const [key, value] of Object.entries(res.errors)) {
            setError(`${key}`, value, value);
          }
          return;
        }
        localStorage.setItem("token", res.authorizationToken);
        toast(`Account registration complete, please activate it via email instruction`);
        handleLoginRedirect();
      });
  };

  let error = false;

  const validateFields = () => {
    error = false;
    setErrors((state) => ({
      ...state,
      email: "",
      username: "",
      password: "",
      passwordMismatch: "",
    }));

    setError("email", "Email cannot be empty", !data?.email);
    setError("username", "Username cannot be empty", !data?.username);
    setError("password", "Password cannot be empty", !data?.password);

    setError(
      "passwordMismatch",
      "Passwords don't match",
      data.confirmPassword !== data.password
    );

    return error;
  };

  const setError = (type, errorString, condition) => {
    if (condition) {
      error = true;
      setErrors((state) => ({ ...state, [type]: errorString }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="sign-up-main" component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              onChange={handleChange}
              error={Boolean(errors?.email)}
              helperText={errors?.email}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              onChange={handleChange}
              error={Boolean(errors?.username)}
              helperText={errors?.username}
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
            />
            <TextField
              margin="normal"
              onChange={handleChange}
              error={Boolean(errors?.password)}
              helperText={errors?.password}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              onChange={handleChange}
              required
              fullWidth
              error={Boolean(errors?.passwordMismatch)}
              helperText={errors?.passwordMismatch}
              name="confirmPassword"
              label="Confirm password"
              type="password"
              id="confirmPassword"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={handlePasswordResetRedirect} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={handleLoginRedirect} variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

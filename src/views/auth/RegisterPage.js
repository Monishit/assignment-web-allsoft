import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import registerImage from "../../assets/images/DocumentBG.png";

// Yup schema with password match
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  dob: yup.date().required("Date of Birth is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile must be 10 digits")
    .required("Mobile number is required"),
  password: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    // Form submission logic here
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${registerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        p: isMobile ? 2 : 4,
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />

      {/* Centered form container */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 700,
          minWidth: 300,
          maxHeight: "90vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: isMobile ? 3 : 4,
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
            }}
          >
            {/* Logo/Header */}
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                sx={{
                  fontSize: isMobile ? "1.75rem" : "2rem",
                  mb: 1,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                All Soft App
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ fontSize: isMobile ? "1.25rem" : "1.5rem" }}
              >
                Create Your Account
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name and DOB in one row */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name"
                      fullWidth
                      margin="normal"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          backgroundColor: "rgba(25, 118, 210, 0.05)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Date of Birth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      error={!!errors.dob}
                      helperText={errors.dob?.message}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          backgroundColor: "rgba(25, 118, 210, 0.05)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Email and Mobile in one row */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          backgroundColor: "rgba(25, 118, 210, 0.05)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Mobile Number"
                      fullWidth
                      margin="normal"
                      error={!!errors.mobile}
                      helperText={errors.mobile?.message}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          backgroundColor: "rgba(25, 118, 210, 0.05)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Password and Confirm Password in one row */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          backgroundColor: "rgba(25, 118, 210, 0.05)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          backgroundColor: "rgba(25, 118, 210, 0.05)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 4,
                  py: isMobile ? 1.2 : 1.5,
                  borderRadius: 2,
                  background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                  boxShadow: "0 4px 12px rgba(25,118,210,0.4)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #1565c0, #1e88e5)",
                    boxShadow: "0 6px 15px rgba(25,118,210,0.6)",
                  },
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  fontWeight: "bold",
                  letterSpacing: 1.1,
                  height: isMobile ? 48 : 56,
                }}
              >
                Register
              </Button>
            </form>

            <Box mt={4} textAlign="center">
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: isMobile ? "0.875rem" : "0.9375rem",
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                  }}
                >
                  Login Now
                </Link>
              </Typography>
            </Box>

            <Box mt={4} textAlign="center">
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  fontSize: "0.75rem",
                }}
              >
                © {new Date().getFullYear()} All Soft App. All rights reserved.
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}

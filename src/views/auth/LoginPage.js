import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PATH_TO_DASHBOARD } from "../../routes/paths";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import registerImage from "../../assets/images/DocumentBG.png";
import RHFTextFieldWithIcon from "../../components/hookForm/RHFTextFieldWithIcon";
import { useDispatch, useSelector } from "react-redux";
import { generateOtp, validateOtp } from "../../redux/services/authService";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPhone, setPhone] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  // Yup schemas
  const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Must be exactly 10 digits"),
  });

  const otpSchema = Yup.object().shape({
    otp: Yup.array()
      .of(Yup.string().matches(/^\d$/, "Must be a digit").required("Required"))
      .length(6, "OTP must be 6 digits"),
  });

  // useForm with resolver, defaultValues
  const methods = useForm({
    resolver: yupResolver(step === 1 ? phoneSchema : otpSchema),
    defaultValues: {
      phone: "",
      otp: ["", "", "", "", "", ""],
    },
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  // Submit handlers
  const onSubmitPhone = (data) => {
    dispatch(generateOtp({ mobile_number: Number(data?.phone) })).then(
      (response) => {
        if (response?.payload?.status === true) {
          setStep(2);
          setPhone(Number(data?.phone));
        }
      }
    );
  };

  const onSubmitOtp = (data) => {
    const otpValue = data.otp.join("");
    if (otpValue.length === 6) {
      const payload = {
        mobile_number: selectedPhone,
        otp: otpValue,
      };
      dispatch(validateOtp(payload)).then((response) => {
        if (response?.payload?.status === true) {
          localStorage.setItem("token", response?.payload?.data?.token);
          localStorage.setItem(
            "userData",
            JSON.stringify(response?.payload?.data)
          );
          navigate(PATH_TO_DASHBOARD.dashboard.app);
        }
      });
    }
  };

  // OTP input change handler
  const handleOtpChange = (value, index) => {
    setValue(`otp[${index}]`, value.slice(-1)); // last digit only

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Auto focus previous input on backspace
    if (!value && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
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
        p: { xs: 2, sm: 3, md: 4 },
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
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      />

      {/* Centered form container */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: { xs: "100%", sm: 500, md: 600 },
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
              p: { xs: 3, sm: 4, md: 5 },
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
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                  mb: 1,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                All Soft App
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                }}
              >
                Sign In to Your Account
              </Typography>
            </Box>

            <FormProvider {...methods}>
              {step === 1 && (
                <form onSubmit={handleSubmit(onSubmitPhone)}>
                  <RHFTextFieldWithIcon
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    icon="mdi:phone"
                    iconColor="#1976d2"
                    sx={{ mb: 3 }}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    autoComplete="tel"
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 1,
                      py: { xs: 1.2, md: 1.5 },
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                      boxShadow: "0 4px 12px rgba(25,118,210,0.4)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #1565c0, #1e88e5)",
                        boxShadow: "0 6px 15px rgba(25,118,210,0.6)",
                      },
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      fontWeight: "bold",
                      letterSpacing: 1.1,
                      height: { xs: 48, md: 56 },
                    }}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} color="#FFF"/> : "Get OTP"}
                  </Button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit(onSubmitOtp)}>
                  <Typography
                    align="center"
                    mb={3}
                    sx={{
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      color: "text.secondary",
                    }}
                  >
                    Enter the 6-digit OTP sent to
                    <Box component="span" fontWeight="bold" ml={1}>
                      {getValues("phone")}
                    </Box>
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: 1, sm: 2 },
                      justifyContent: "center",
                      mb: 4,
                    }}
                  >
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <Controller
                        key={idx}
                        name={`otp[${idx}]`}
                        control={methods.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id={`otp-${idx}`}
                            onChange={(e) =>
                              handleOtpChange(e.target.value, idx)
                            }
                            value={field.value}
                            inputProps={{
                              maxLength: 1,
                              style: { textAlign: "center" },
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            }}
                            sx={{
                              width: { xs: 42, sm: 50, md: 56 },
                              "& .MuiInputBase-input": {
                                fontSize: {
                                  xs: "1.5rem",
                                  sm: "1.75rem",
                                  md: "2rem",
                                },
                                py: { xs: 1.2, sm: 1.5 },
                                px: 0,
                                fontWeight: "bold",
                                color: theme.palette.primary.main,
                              },
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                backgroundColor: "rgba(25, 118, 210, 0.05)",
                              },
                            }}
                            error={!!errors.otp?.[idx]}
                            helperText={errors.otp?.[idx]?.message}
                          />
                        )}
                      />
                    ))}
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      py: { xs: 1.2, md: 1.5 },
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                      boxShadow: "0 4px 12px rgba(25,118,210,0.4)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #1565c0, #1e88e5)",
                        boxShadow: "0 6px 15px rgba(25,118,210,0.6)",
                      },
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      fontWeight: "bold",
                      letterSpacing: 1.1,
                      height: { xs: 48, md: 56 },
                    }}
                    type="submit"
                  >
                    {isLoading ? <CircularProgress size={24} color="#FFF"/> : "Verify OTP"}
                  </Button>

                  <Box mt={3} textAlign="center">
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      onClick={() => setStep(1)}
                      sx={{
                        fontSize: { xs: "0.8rem", sm: "0.875rem" },
                        fontWeight: 600,
                      }}
                    >
                      Change Phone Number
                    </Button>
                  </Box>
                </form>
              )}
            </FormProvider>

            <Box mt={4} textAlign="center">
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                  color: "text.secondary",
                }}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                  }}
                >
                  Register Now
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

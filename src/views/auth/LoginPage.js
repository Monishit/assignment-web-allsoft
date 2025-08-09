import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PATH_TO_DASHBOARD } from '../../routes/paths';
import { Box, Grid, TextField, Button, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import registerImage from '../../assets/images/DocumentBG.png';
import RHFTextFieldWithIcon from '../../components/hookForm/RHFTextFieldWithIcon';

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Yup schemas
  const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Must be exactly 10 digits'),
  });

  const otpSchema = Yup.object().shape({
    otp: Yup.array()
      .of(Yup.string().matches(/^\d$/, 'Must be a digit').required('Required'))
      .length(4, 'OTP must be 4 digits'),
  });

  // useForm with resolver, defaultValues
  const methods = useForm({
    resolver: yupResolver(step === 1 ? phoneSchema : otpSchema),
    defaultValues: {
      phone: '',
      otp: ['', '', '', ''],
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
    setStep(2);
    console.log('Phone submitted:', data.phone);
  };

  const onSubmitOtp = (data) => {
    console.log('OTP submitted:', data.otp.join(''));
    navigate(PATH_TO_DASHBOARD.dashboard.app);
  };

  // OTP input change handler
  const handleOtpChange = (value, index) => {
    setValue(`otp[${index}]`, value.slice(-1)); // last digit only
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <Grid
      container
      gap={20}
      sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8' }}
    >
      {/* Left side with image */}
      <Grid
        item
        xs={12}
        md={9}
        sx={{
          position: 'relative',
          backgroundImage: `url(${registerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 5,
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="h6">
            Sign in securely to access your dashboard and manage your account.
          </Typography>
        </Box>
      </Grid>

      {/* Right side with form */}
      <Grid
        item
        xs={12}
        md={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              width: '100%',
              maxWidth: 400,
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={3} align="center">
              Sign In
            </Typography>

            {/* Wrap forms with FormProvider */}
            <FormProvider {...methods}>
              {step === 1 && (
                <form onSubmit={handleSubmit(onSubmitPhone)}>
                  <RHFTextFieldWithIcon
                    name="phone"
                    label="Phone Number"
                    type="text"
                    placeholder="Enter your phone number"
                    icon="mdi:phone"
                    iconColor="#1976d2"
                    sx={{ mb: 2 }}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      py: 1.2,
                      borderRadius: 2,
                      background:
                        'linear-gradient(45deg, #1976d2, #42a5f5)',
                      boxShadow: '0 4px 12px rgba(25,118,210,0.4)',
                      '&:hover': {
                        background:
                          'linear-gradient(45deg, #1565c0, #1e88e5)',
                      },
                    }}
                    type="submit"
                  >
                    Get OTP
                  </Button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit(onSubmitOtp)}>
                  <Typography align="center" mb={2}>
                    Enter the OTP sent to {getValues('phone')}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    {[0, 1, 2, 3].map((idx) => (
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
                              style: { textAlign: 'center', fontSize: '1.5rem' },
                            }}
                            error={!!errors.otp?.[idx]}
                            helperText={errors.otp?.[idx]?.message}
                            sx={{ width: 60 }}
                          />
                        )}
                      />
                    ))}
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 1,
                      py: 1.2,
                      borderRadius: 2,
                      background:
                        'linear-gradient(45deg, #1976d2, #42a5f5)',
                      boxShadow: '0 4px 12px rgba(25,118,210,0.4)',
                      '&:hover': {
                        background:
                          'linear-gradient(45deg, #1565c0, #1e88e5)',
                      },
                    }}
                    type="submit"
                  >
                    Verify OTP
                  </Button>
                </form>
              )}
            </FormProvider>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don’t have an account?{' '}
              <Link
                to="/register"
                style={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  fontWeight: 'bold',
                }}
              >
                Register
              </Link>
            </Typography>
          </Paper>
        </motion.div>
      </Grid>
    </Grid>
  );
}

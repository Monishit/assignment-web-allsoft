// src/views/auth/RegisterPage.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Grid, TextField, Button, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // add this at the top

// ✅ Import your local image
import registerImage from '../../assets/images/DocumentBG.png'; // <-- adjust path & name

// ✅ Yup schema with password match
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  dob: yup.date().required('Date of Birth is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, 'Mobile must be 10 digits')
    .required('Mobile number is required'),
  password: yup
    .string()
    .min(6, 'At least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function RegisterPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
  };

  return (
    <Grid
      container
      gap={5}
      sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8' }}
    >
      {/* Left side with local image and text */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          position: 'relative', // important for overlay positioning
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
        {/* Black overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)', // black tint
            zIndex: 1,
          }}
        />

        {/* Text content - must be above overlay */}
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant='h3' fontWeight='bold' gutterBottom>
            Welcome to Our Platform
          </Typography>
          <Typography variant='h6'>
            Join us and explore amazing features with a secure and simple
            registration process.
          </Typography>
        </Box>
      </Grid>

      {/* Right side with form */}
      <Grid
        item
        xs={12}
        md={6}
        display='flex'
        alignItems='center'
        justifyContent='center'
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
              maxWidth: 500,
              backgroundColor: '#fff',
            }}
          >
            <Typography variant='h5' fontWeight='bold' mb={3} align='center'>
              Create Account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Full Name'
                    fullWidth
                    margin='normal'
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />

              <Controller
                name='dob'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Date of Birth'
                    type='date'
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin='normal'
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                  />
                )}
              />

              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Email'
                    fullWidth
                    margin='normal'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name='mobile'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Mobile Number'
                    fullWidth
                    margin='normal'
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                  />
                )}
              />

              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Password'
                    type='password'
                    fullWidth
                    margin='normal'
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Confirm Password'
                    type='password'
                    fullWidth
                    margin='normal'
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />

              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.2,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  boxShadow: '0 4px 12px rgba(25,118,210,0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0, #1e88e5)',
                  },
                }}
              >
                Register
              </Button>
            </form>

            <Typography variant='body2' align='center' sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link
                to='/login'
                style={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  fontWeight: 'bold',
                }}
              >
                Login
              </Link>
            </Typography>
          </Paper>
        </motion.div>
      </Grid>
    </Grid>
  );
}

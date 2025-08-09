import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, InputAdornment } from '@mui/material';
import { Icon } from '@iconify/react';

export default function RHFTextFieldWithIcon({
  name,
  label,
  icon,
  iconColor = '#888',
  placeholder,
  type = 'text',
  sx,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          placeholder={placeholder}
          fullWidth
          error={!!error}
          helperText={error?.message}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: '#fff',
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
              },
            },
            ...sx,
          }}
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position="start">
                <Icon icon={icon} color={iconColor} width={24} height={24} />
              </InputAdornment>
            ) : null,
          }}
          {...other}
        />
      )}
    />
  );
}

import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function RHFDatePicker({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePicker
          {...field}
          label={label}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
          {...other}
        />
      )}
    />
  );
}

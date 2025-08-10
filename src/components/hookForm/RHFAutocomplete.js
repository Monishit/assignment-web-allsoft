import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

export default function RHFAutocomplete({
  name,
  label,
  options = [],
  multiple = false, // allow enabling/disabling multiple
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          multiple={multiple}
          options={options}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option?.label || ""
          }
          value={field.value || (multiple ? [] : null)}
          onChange={(_, newValue) => field.onChange(newValue)}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
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

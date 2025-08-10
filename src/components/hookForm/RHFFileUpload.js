import { Controller, useFormContext } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function RHFFileUpload({ name, accept }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Box mt={2}>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload File
            <input
              type="file"
              hidden
              accept={accept}
              onChange={(e) => field.onChange(e.target.files[0])}
            />
          </Button>
          {fieldState.error && (
            <Typography variant="caption" color="error" display="block">
              {fieldState.error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
}

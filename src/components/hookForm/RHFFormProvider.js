import React from "react";
import { FormProvider as RHFProvider } from "react-hook-form";
import { Box } from "@mui/material";

export default function RHFFormProvider({
  methods,
  onSubmit,
  children,
  sx,
  ...other
}) {
  return (
    <RHFProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        sx={sx}
        {...other}
      >
        {children}
      </Box>
    </RHFProvider>
  );
}

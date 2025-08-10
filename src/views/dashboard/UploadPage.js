import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  Button,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFFormProvider from "../../components/hookForm/RHFFormProvider";
import RHFDatePicker from "../../components/hookForm/RHFDatePicker";
import RHFAutocomplete from "../../components/hookForm/RHFAutocomplete";
import RHFFileUpload from "../../components/hookForm/RHFFileUpload";
import RHFTextFieldWithIcon from "../../components/hookForm/RHFTextFieldWithIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocumentTags,
  uploadData,
} from "../../redux/services/documentService";
import dayjs from "dayjs";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  date: yup.date().required("Date is required"),
  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("Sub-category is required"),
  tags: yup.array(),
  remarks: yup.string().required("Remarks are required"),
  file: yup
    .mixed()
    .required("File is required")
    .test("fileType", "Only PDF and image files allowed", (value) => {
      return (
        value &&
        ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
      );
    }),
});

export default function UploadPage() {
  const dispatch = useDispatch();
  const { documentTags, isSubmiitting } = useSelector(
    (state) => state?.document
  );

  const tagOptions = Array.isArray(documentTags)
    ? documentTags.map((item) => ({
        label: item?.label,
        value: item?.id,
      }))
    : [];

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: null,
      category: "",
      subCategory: "",
      tags: [],
      remarks: "",
      file: null,
    },
  });

  const category = methods.watch("category");
  const fileValue = methods.watch("file");

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append file
    if (data.file) {
      formData.append("file", data.file);
    }

    // Build JSON payload exactly like API requires
    const payloadData = {
      major_head: data.category || "",
      minor_head: data.subCategory || "",
      document_date: dayjs(data?.date).format("DD-MM-YYYY"),
      document_remarks: data.remarks || "",
      tags: Array.isArray(data.tags)
        ? data.tags.map((tag) => ({
            tag_name: typeof tag === "string" ? tag : tag.label,
          }))
        : [],
      user_id: "nitin", // Replace with logged-in user's id if available
    };

    // Append JSON string to FormData
    formData.append("data", JSON.stringify(payloadData));

    try {
      let response = await dispatch(uploadData(formData));
      if (response?.payload?.status === true) {
        toast.success(response?.payload?.message);
        methods.reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const payload = { term: "" };
    dispatch(getDocumentTags(payload));
  }, [dispatch]);

  const handleRemoveFile = () => {
    methods.setValue("file", null);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        borderRadius: 4,
        boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
      }}
    >
      <Typography variant="h5" gutterBottom>
        File Upload
      </Typography>

      <RHFFormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2}>
          <RHFAutocomplete
            name="category"
            label="Major head"
            options={["Personal", "Professional"]}
          />

          <RHFTextFieldWithIcon name="subCategory" label="Minor Head" />

          <RHFDatePicker name="date" label="Date" />

          <RHFAutocomplete
            name="tags"
            label="Document Tags"
            options={tagOptions}
            multiple
          />

          <RHFTextFieldWithIcon
            name="remarks"
            label="Remarks"
            placeholder="Enter remarks"
            multiline
            rows={3}
          />

          {!fileValue ? (
            <RHFFileUpload name="file" accept="application/pdf,image/*" />
          ) : (
            <Box sx={{ textAlign: "center" }}>
              {fileValue.type === "application/pdf" ? (
                <embed
                  src={URL.createObjectURL(fileValue)}
                  type="application/pdf"
                  width="100%"
                  height="200px"
                />
              ) : (
                <img
                  src={URL.createObjectURL(fileValue)}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                  }}
                />
              )}
              <Stack direction="row" spacing={2} justifyContent="center" mt={1}>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={handleRemoveFile}
                >
                  Remove
                </Button>
                <RHFFileUpload name="file" accept="application/pdf,image/*" />
              </Stack>
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              background:
                "linear-gradient(90deg, #6b11cb84 0%, #2574fc81 100%)",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #6b11cb84 0%, #2574fc89 100%)",
              },
            }}
          >
            {isSubmiitting ? (
              <CircularProgress size={24} color="#fff" />
            ) : (
              "Submit"
            )}
          </Button>
        </Stack>
      </RHFFormProvider>
    </Paper>
  );
}

import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Visibility as PreviewIcon,
  GetApp as DownloadIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
  FolderZip as ZipIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { searchDocument } from "../../redux/services/documentService";
import JSZip from "jszip";
import saveAs from "file-saver";

const TABLE_HEAD = [
  { id: "row_num", label: "Row #", width: "60px" },
  { id: "document_id", label: "Document ID", width: "150px" },
  { id: "major_head", label: "Major Head", width: "150px" },
  { id: "minor_head", label: "Minor Head", width: "150px" },
  { id: "file_url", label: "File", width: "200px" }, // Increased width
  { id: "document_date", label: "Document Date", width: "150px" },
  { id: "document_remarks", label: "Remarks", width: "150px" },
  { id: "upload_time", label: "Upload Time", width: "150px" },
  { id: "uploaded_by", label: "Uploaded By", width: "150px" },
];

export default function SearchPage() {
  const dispatch = useDispatch();
  const { searchDocumentData } = useSelector((state) => state?.document);

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState({ url: "", type: "" });
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [formData, setFormData] = useState({
    major_head: "",
    minor_head: "",
    from_date: "",
    to_date: "",
    tags: [{ tag_name: "" }],
    uploaded_by: "",
    start: 0,
    length: 10,
    search: { value: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index].tag_name = value;
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const handleSearch = async () => {
    setPage(0);
    try {
      await dispatch(
        searchDocument({ ...formData, start: 0, length: rowsPerPage })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePage = async (event, newPage) => {
    const newStart = newPage * rowsPerPage;
    setPage(newPage);
    setFormData((prev) => ({ ...prev, start: newStart, length: rowsPerPage }));
  };

  useEffect(() => {
    dispatch(searchDocument(formData));
  }, [dispatch, formData]);

  // File preview handler
  const handlePreview = (fileUrl) => {
    const extension = fileUrl.split(".").pop().toLowerCase();
    const previewType = ["jpg", "jpeg", "png", "gif"].includes(extension)
      ? "image"
      : extension === "pdf"
      ? "pdf"
      : "unsupported";

    setPreviewFile({ url: fileUrl, type: previewType });
    setPreviewOpen(true);
  };

  // Single file download
  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName || "document");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download all files as ZIP
  const handleDownloadAll = async () => {
    if (!searchDocumentData.length) {
      setSnackbar({
        open: true,
        message: "No files to download",
        severity: "warning",
      });
      return;
    }

    setDownloadingZip(true);
    const zip = new JSZip();
    const filePromises = [];

    try {
      // Add each file to ZIP
      searchDocumentData.forEach((doc) => {
        if (doc.file_url) {
          const promise = fetch(doc.file_url)
            .then((response) => response.blob())
            .then((blob) => {
              // Use document ID in filename for uniqueness
              const fileName = `${doc.document_id}_${doc.file_url
                .split("/")
                .pop()}`;
              zip.file(fileName, blob);
            })
            .catch((error) => {
              console.error(`Failed to fetch file: ${doc.file_url}`, error);
              setSnackbar({
                open: true,
                message: `Failed to download: ${doc.file_url.split("/").pop()}`,
                severity: "error",
              });
            });
          filePromises.push(promise);
        }
      });

      // Wait for all files to be added
      await Promise.all(filePromises);

      // Generate and save ZIP
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "documents.zip");
      setSnackbar({
        open: true,
        message: "ZIP download started",
        severity: "success",
      });
    } catch (error) {
      console.error("Error creating ZIP:", error);
      setSnackbar({
        open: true,
        message: "Failed to create ZIP file",
        severity: "error",
      });
    } finally {
      setDownloadingZip(false);
    }
  };

  // Preview dialog component
  const PreviewDialog = () => (
    <Dialog
      open={previewOpen}
      onClose={() => setPreviewOpen(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{ style: { maxHeight: "90vh" } }}
    >
      <DialogTitle>File Preview</DialogTitle>
      <DialogContent dividers>
        {previewFile.type === "image" ? (
          <Box display="flex" justifyContent="center">
            <img
              src={previewFile.url}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
              }}
            />
          </Box>
        ) : previewFile.type === "pdf" ? (
          <Box height="70vh">
            <iframe
              src={previewFile.url}
              width="100%"
              height="100%"
              title="PDF Preview"
              style={{ border: "none" }}
            />
          </Box>
        ) : (
          <Box textAlign="center" p={4}>
            <FileIcon style={{ fontSize: 60, color: "#757575" }} />
            <Typography variant="h6" mt={2}>
              Preview not available
            </Typography>
            <Typography variant="body2" color="textSecondary">
              This file type cannot be previewed. Please download to view.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        {previewFile.type !== "unsupported" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDownload(previewFile.url)}
            startIcon={<DownloadIcon />}
          >
            Download
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  return (
    <Box p={3}>
      {/* Search Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Search Documents
        </Typography>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          <TextField
            label="Major Head"
            name="major_head"
            value={formData.major_head}
            onChange={handleChange}
            select
            sx={{ flex: "1 1 250px" }}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
          </TextField>

          <TextField
            label="Minor Head"
            name="minor_head"
            value={formData.minor_head}
            onChange={handleChange}
            sx={{ flex: "1 1 250px" }}
          />

          <TextField
            label="From Date"
            name="from_date"
            type="date"
            value={formData.from_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: "1 1 200px" }}
          />

          <TextField
            label="To Date"
            name="to_date"
            type="date"
            value={formData.to_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: "1 1 200px" }}
          />

          {formData.tags.map((tag, idx) => (
            <TextField
              key={idx}
              label={`Tag ${idx + 1}`}
              value={tag.tag_name}
              onChange={(e) => handleTagChange(idx, e.target.value)}
              sx={{ flex: "1 1 200px" }}
            />
          ))}

          <TextField
            label="Uploaded By"
            name="uploaded_by"
            value={formData.uploaded_by}
            onChange={handleChange}
            sx={{ flex: "1 1 200px" }}
          />

          <TextField
            label="Search Value"
            value={formData.search.value}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                search: { value: e.target.value },
              }))
            }
            sx={{ flex: "1 1 250px" }}
          />

          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              flex: "1 1 150px",
              background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              color: "#fff",
            }}
          >
            Search
          </Button>
        </div>
      </Paper>

      {/* Table Section */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Search Results</Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownloadAll}
            disabled={downloadingZip || !searchDocumentData.length}
            startIcon={
              downloadingZip ? <CircularProgress size={20} /> : <ZipIcon />
            }
          >
            {downloadingZip ? "Preparing ZIP..." : "Download All as ZIP"}
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((col) => (
                  <TableCell key={col.id} sx={{ width: col.width }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchDocumentData.length > 0 ? (
                searchDocumentData.map((row, i) => {
                  const fileExtension =
                    row.file_url?.split(".").pop()?.toLowerCase() || "";
                  const isImage = ["jpg", "jpeg", "png", "gif"].includes(
                    fileExtension
                  );
                  const isPDF = fileExtension === "pdf";

                  return (
                    <TableRow key={i}>
                      <TableCell>{row.row_num}</TableCell>
                      <TableCell>{row.document_id}</TableCell>
                      <TableCell>{row.major_head}</TableCell>
                      <TableCell>{row.minor_head}</TableCell>
                      <TableCell>
                        {row.file_url ? (
                          <Box display="flex" alignItems="center" gap={1}>
                            <Tooltip title="Preview">
                              <IconButton
                                onClick={() => handlePreview(row.file_url)}
                                disabled={!isImage && !isPDF}
                                color="primary"
                              >
                                {isImage ? (
                                  <ImageIcon />
                                ) : isPDF ? (
                                  <PdfIcon />
                                ) : (
                                  <FileIcon />
                                )}
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Download">
                              <IconButton
                                onClick={() =>
                                  handleDownload(row.file_url, row.document_id)
                                }
                                color="primary"
                              >
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(row.document_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{row.document_remarks}</TableCell>
                      <TableCell>
                        {new Date(row.upload_time).toLocaleString()}
                      </TableCell>
                      <TableCell>{row.uploaded_by}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={TABLE_HEAD.length} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={searchDocumentData[0]?.total_count || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
        />
      </Paper>

      {/* Preview Dialog */}
      <PreviewDialog />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

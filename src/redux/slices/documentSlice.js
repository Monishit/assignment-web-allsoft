import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getDocumentTags,
  uploadData,
  searchDocument,
} from "../services/documentService";

const initialState = {
  isLoading: false,
  isSubmiitting: false,
  documentTags: [],
  searchDocumentData: [],
};

const DocumentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get document tags
    builder.addMatcher(isAnyOf(getDocumentTags.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getDocumentTags.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.documentTags = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getDocumentTags.rejected), (state) => {
      state.isLoading = false;
    });

    // upload document
    builder.addMatcher(isAnyOf(uploadData.pending), (state) => {
      state.isSubmiitting = true;
    });
    builder.addMatcher(isAnyOf(uploadData.fulfilled), (state, { payload }) => {
      state.isSubmiitting = false;
    });
    builder.addMatcher(isAnyOf(uploadData.rejected), (state) => {
      state.isSubmiitting = false;
    });

    // upload document
    builder.addMatcher(isAnyOf(searchDocument.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(searchDocument.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.searchDocumentData = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(searchDocument.rejected), (state) => {
      state.isLoading = false;
    });
  },
});

export default DocumentSlice.reducer;

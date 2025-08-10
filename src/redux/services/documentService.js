import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";
import AxiosClientMultiForm from "../../utils/axios";

export const getDocumentTags = createAsyncThunk(
  "document/getDocumentTagsAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "documentTags",
      method: "post",
      data,
    })
);

export const uploadData = createAsyncThunk(
  "document/uploadDataAsync",
  async (data, toolkit) =>
    AxiosClientMultiForm({
      toolkit,
      url: "/saveDocumentEntry",
      method: "post",
      data,
    })
);

export const searchDocument = createAsyncThunk(
  "document/searrchDocumentAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/searchDocumentEntry",
      method: "post",
      data,
    })
);

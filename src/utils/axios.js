import { toast } from "react-hot-toast";
import axios from "axios";

const isErrorResponse = (error) => {
  return error && typeof error.message === "string";
};

const AxiosClient = async (args) => {
  const { toolkit, headers = {}, data, ...rest } = args;

  const isFormData = data instanceof FormData;

  const token = localStorage?.getItem("token") || "";
  const tempToken = localStorage?.getItem("tempToken") || "";

  return axios({
    baseURL: process.env.REACT_PUBLIC_API_BASE,
    ...rest,
    data,
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      ...((token || tempToken) &&
      (token || tempToken) !== "null" &&
      (token || tempToken) !== "undefined"
        ? { Authorization: token || tempToken }
        : {}),
      ...headers,
    },
  })
    .then((response) => toolkit.fulfillWithValue(response.data))
    .catch((error) => {
      if (error.response?.data && isErrorResponse(error.response.data)) {
        return toolkit.rejectWithValue(error.response.data);
      }
      return toolkit.rejectWithValue("An unknown error occurred");
    });
};

// Axios Interceptor for Handling Errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = isErrorResponse(error.response?.data)
      ? error.response.data.message
      : "Something went wrong";

    toast.error(errorMessage, {
      position: "top-right",
    });

    if (error.response?.status === 401) {
      localStorage.clear("");
      window.location.href = "/";
    }

    return Promise.reject(error.response?.data ?? "Something went wrong");
  }
);

export default AxiosClient;

// Multi-form request handler
export const AxiosClientMultiForm = async (args) => {
  const { toolkit, headers = {}, ...rest } = args;
  const token = localStorage?.getItem("token") || "";

  return axios({
    baseURL: process.env.REACT_PUBLIC_API_BASE,
    ...rest,
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token && token !== "null" && token !== "undefined"
        ? { Authorization: token }
        : {}),
      ...headers,
    },
  })
    .then((response) => toolkit.fulfillWithValue(response.data))
    .catch((error) => {
      if (error.response?.data && isErrorResponse(error.response.data)) {
        return toolkit.rejectWithValue(error.response.data);
      }
      return toolkit.rejectWithValue("An unknown error occurred");
    });
};
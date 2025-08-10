import { toast } from "react-hot-toast";
import axios from "axios";

const isErrorResponse = (error) => {
  return error && typeof error.message === "string";
};

const REACT_PUBLIC_BASE_URL = "https://apis.allsoft.co/api/documentManagement/";

const AxiosClient = async (args) => {
  const { toolkit, headers = {}, data, ...rest } = args;

  const isFormData = data instanceof FormData;

  const token = localStorage?.getItem("token") || "";
  const tempToken = localStorage?.getItem("tempToken") || "";

  return axios({
    baseURL: REACT_PUBLIC_BASE_URL,
    ...rest,
    data,
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      ...((token || tempToken) &&
      (token || tempToken) !== "null" &&
      (token || tempToken) !== "undefined"
        ? { token: token || tempToken }
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
    baseURL: REACT_PUBLIC_BASE_URL,
    ...rest,
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token && token !== "null" && token !== "undefined"
        ? { token: token }
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

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import ReduxProvider from "./redux/ReduxProvider";

// MUI DatePicker Setup
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ReduxProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <BrowserRouter>
              <CssBaseline />
              <Router />
              <Toaster />
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </ReduxProvider>
  );
}

export default App;

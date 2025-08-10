import { Navigate, useLocation } from "react-router-dom";
import { PATH_TO_DASHBOARD } from "../../routes/paths";

export default function AuthGuard({ children }) {
  const location = useLocation();

  // Hardcoded token for bypass
  const token = localStorage.getItem("token");

  return token ? (
    children
  ) : (
    <Navigate
      to={PATH_TO_DASHBOARD.auth.login}
      state={{ from: location }}
      replace
    />
  );
}

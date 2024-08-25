import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/localStorage/token";
import { jwtDecode } from "jwt-decode";
import SpinLoading from "src/Components/spinner/spinLoading";
import Spinner from "src/Components/spinner/Spinner";

const GuardAdminRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAdmin, setIsAdmin] = useState<Boolean | null>(null);

  useEffect(() => {
    const token = getToken("access_token");
    if (token) {
      try {
        const decodeToken = jwtDecode(token) as { [key: string]: any };
        setIsAdmin(decodeToken?.role === "admin");
      } catch (error) {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);
  if (isAdmin === null) {
    return <Spinner loading/>;
  }

  return isAdmin ? <>{children}</> : <Navigate to="/" />;
};

export default GuardAdminRoute;

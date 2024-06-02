import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({ isLoggedIn, setIsLoggedIn, loading, setLoading }) => {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const [loading, setLoading] = useState(true);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

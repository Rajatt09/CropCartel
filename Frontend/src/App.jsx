import "./App.css";
import Layout from "./Layout/Layout";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import Login2 from "./Login/Login2.jsx";
import Dashboard from "./Dashboard/Dashboard";
import Nav from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Signup from "./Login/Signup";
import Login from "./Login/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfilePage from "./Profile/Profile";
import ParticularItem from "./Items/ParticularItem";
import LandingcropLoader from "./CropLoader/LandingcropLoader.jsx";
import PrivateRoutes from "../utils/PrivateRoutes.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    async function redirectingfunction() {
      try {
        const res = await axios.post(`/users/redirecting`, {});
        console.log(res);
        if (res.status == 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          // navigate("/login");
        }
      } catch (error) {
        console.error("error while redirecting: ", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }
    redirectingfunction();
  }, []);

  useEffect(() => {
    console.log("Current URL:", location.pathname);
  }, [location]);

  // if (loading) {
  //   return <div>Loading...</div>; // or a spinner component
  // }

  return (
    <>
      {/* <LandingcropLoader /> */}

      <>
        <Nav />
        <Routes>
          <Route path="/user/:id" element={<Dashboard />} />
          <Route path="/user/item/:id" element={<Dashboard />} />

          <Route
            path="/"
            element={
              isLoggedIn ? (
                loading ? (
                  <LandingcropLoader />
                ) : (
                  <Navigate to="/user/dashboard" />
                )
              ) : loading ? (
                <LandingcropLoader />
              ) : (
                <LandingPage />
              )
            }
          />
          <Route path="/login" element={<Login2 />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </>
    </>
  );
}

export default App;

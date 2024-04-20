import "./App.css";
import Layout from "./Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import Login2 from "./Login/Login2";
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

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   async function redirectingfunction() {
  //     try {
  //       const res = await axios.post(`/users/redirecting`, {});
  //       console.log(res);
  //       if (res.status == 200) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //         // navigate("/login");
  //       }
  //     } catch (error) {
  //       console.error("error while redirecting: ", error);
  //     }
  //   }
  //   redirectingfunction();
  // }, []);
  return (
    <>
      {/* <Layout /> */}
      <Nav />
      <Routes>
        {/* <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />}
        /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login2 />} />
        {/* <Route path="/user/myprofile" element={<ProfilePage />} /> */}
        {/* <Route path="/user/createaccount" element={<Login />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/:id" element={<Dashboard />} />
        <Route path="/user/item/:id" element={<Dashboard />} />
        {/* <Route path="/user/:id" element={<ParticularItem />} /> */}
        {/* <Route path="/farmer/:id" element={<Farmer />} />
        <Route path="/buyer/:id" element={<Buyer />} /> */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
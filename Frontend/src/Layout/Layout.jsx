import React from "react";
import Nav from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Login2 from "../Login/Login2";
import Signup from "../Login/Signup";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Login2 />
      {/* <Signup /> */}
      <Footer />
    </div>
  );
};

export default Layout;
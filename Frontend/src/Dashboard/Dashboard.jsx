import React from "react";
import ProfilePage from "../Profile/Profile";
import AvatarSection from "../Login/AvatarSection";
import InnerNavbar from "../Navbar/InnerNavbar";
import MainSection from "../MainSection/MainSection";

const Dashboard = () => {
  return (
    <div className="mid-padding page-mid-section2">
      <InnerNavbar />
      <MainSection />
      {/* <ProfilePage /> */}
    </div>
  );
};

export default Dashboard;

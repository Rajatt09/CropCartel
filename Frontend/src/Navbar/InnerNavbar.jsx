import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import ApiCall from "../../utils/ApiCall";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import SideNavbar from "./Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function InnerNavbar() {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const response = await ApiCall("/users/getDetails", "GET", null);
        const temp = response.data.data || {};

        setUserProfile(temp);

        console.log("temp", temp);
        console.log("userData", userProfile);
      } catch (error) {
        console.error("Error while fetching User: ", error);
      }
    };
    getuserdetails();
  }, []);
  return (
    <div>
      <div>
        {userProfile.avatar ? (
          <Link to="/user/myprofile">
            <Image
              src={userProfile.avatar}
              roundedCircle
              style={{
                position: "fixed",
                top: "9px",
                right: "20px",
                zIndex: "10",
                height: "40px",
                width: "40px",
              }}
            />
          </Link>
        ) : (
          <div>
            <Link to="/user/myprofile">
              <IoPersonSharp
                style={{
                  position: "absolute",
                  top: "13.5px",
                  right: "20px",
                  zIndex: "10",
                  border: "2px solid gray",
                  borderRadius: "50%",
                  padding: "1px",
                  //   height: "80px",
                  fontSize: "2rem",
                }}
              />
            </Link>
          </div>
        )}
      </div>

      <Navbar
        className="bg-body-tertiary desktop-nav"
        style={{
          position: "fixed",
          top: "0",
          // right: "0",
          left: "28%",
          boxShadow: "none",
          width: "40%",
          zIndex: "10",
        }}
      >
        <Container>
          {/* <Navbar.Brand>HEllo</Navbar.Brand> */}
          <NavLink to="/user/dashboard">
            <Navbar.Text>Dashboard</Navbar.Text>
          </NavLink>
          <NavLink to="/user/savedItems">
            <Navbar.Text>Saved Items</Navbar.Text>
          </NavLink>

          <Navbar.Text>
            {" "}
            <DropdownButton
              style={{ backgroundColor: "white" }}
              title="History"
            >
              <NavLink to="/user/sold-history">
                <Dropdown.Item href="#/action-1">Items Sold</Dropdown.Item>
              </NavLink>
              <NavLink to="/user/bought-history">
                <Dropdown.Item href="#/action-1">Items Bought</Dropdown.Item>
              </NavLink>
            </DropdownButton>
          </Navbar.Text>

          <NavLink to="/user/additem">
            <Navbar.Text>Add Item</Navbar.Text>
          </NavLink>

          {/* <Navbar.Text>Link1</Navbar.Text> */}
          {/* <Nav.Link href="#link">Link</Nav.Link> */}
        </Container>
      </Navbar>

      <div
        className="mobile-nav"
        style={{ position: "fixed", top: "10px", left: "10px", zIndex: "17" }}
      >
        <SideNavbar />
      </div>
    </div>
  );
}

export default InnerNavbar;

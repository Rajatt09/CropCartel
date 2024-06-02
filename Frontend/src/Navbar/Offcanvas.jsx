import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Hamburger from "hamburger-react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

function SideNavbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function logout() {
    try {
      const res = await axios.post(`/users/logout`, {});

      window.location.href = "/";
    } catch (error) {
      console.log("error occured while logout: ", error);
      window.location.href = "/";
    }
  }

  return (
    <>
      <div
        style={{ position: "absolute", top: "-5px", color: "white" }}
        onClick={handleShow}
      >
        <Hamburger toggled={false} />
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{ backgroundColor: "rgb(70, 135, 70)" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>CROP CARTEL</Offcanvas.Title>
        </Offcanvas.Header>

        {/* <hr style={{ color: "white" }} /> */}
        <Offcanvas.Body>
          <NavLink to="/user/dashboard">
            <div
              className="offcanvas-li"
              onClick={handleClose}
              style={{ color: "white" }}
            >
              Dashboard
            </div>
          </NavLink>
          <NavLink to="/user/savedItems">
            <div
              className="offcanvas-li"
              onClick={handleClose}
              style={{ color: "white" }}
            >
              Saved Items
            </div>
          </NavLink>
          <NavLink to="/user/sold-history">
            <div
              className="offcanvas-li"
              onClick={handleClose}
              style={{ color: "white" }}
            >
              Sold History
            </div>
          </NavLink>
          <NavLink to="/user/bought-history">
            <div
              className="offcanvas-li"
              onClick={handleClose}
              style={{ color: "white" }}
            >
              Bought History
            </div>
          </NavLink>
          <NavLink to="/user/additem">
            <div
              className="offcanvas-li"
              onClick={handleClose}
              style={{ color: "white" }}
            >
              Add Item
            </div>
          </NavLink>
        </Offcanvas.Body>

        <div style={{ color: "white", cursor: "pointer" }} onClick={logout}>
          <hr />
          <Offcanvas.Title>
            <div style={{ margin: "20px", textAlign: "center" }}>
              LOG OUT &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                fill="currentColor"
                className="bi bi-box-arrow-right"
                viewBox="0 1 17 17"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            </div>
          </Offcanvas.Title>
        </div>
      </Offcanvas>
    </>
  );
}

export default SideNavbar;

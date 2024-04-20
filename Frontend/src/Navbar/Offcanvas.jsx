import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Hamburger from "hamburger-react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function SideNavbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        <Hamburger toggled={false} />
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Logo</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavLink to="/user/dashboard">
            <div className="offcanvas-li" onClick={handleClose}>
              Dashboard
            </div>
          </NavLink>
          <NavLink to="/user/savedItems">
            <div className="offcanvas-li" onClick={handleClose}>
              Saved Items
            </div>
          </NavLink>
          <NavLink to="/user/sold-history">
            <div className="offcanvas-li" onClick={handleClose}>
              Sold History
            </div>
          </NavLink>
          <NavLink to="/user/bought-history">
            <div className="offcanvas-li" onClick={handleClose}>
              Bought History
            </div>
          </NavLink>
          <NavLink to="/user/additem">
            <div className="offcanvas-li" onClick={handleClose}>
              Add Item
            </div>
          </NavLink>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideNavbar;
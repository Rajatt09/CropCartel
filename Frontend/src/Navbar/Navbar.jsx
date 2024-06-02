import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import image2 from "./image2.png";

function Nav() {
  return (
    <>
      <Navbar
        className="bg-body-tertiary nav"
        style={{
          position: "fixed",
          backgroundColor: "rgb(70, 135, 70)",
          top: "0",
          width: "100%",
          zIndex: "10",
        }}
      >
        <Container style={{ marginLeft: "10px" }}>
          <Navbar.Brand
            className="desktop-nav"
            style={{ color: "white" }}
            href="/"
          >
            {/* <img style={{ height: "40px" }} src={image2} alt="logo" /> */}
            CROP CARTEL
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;

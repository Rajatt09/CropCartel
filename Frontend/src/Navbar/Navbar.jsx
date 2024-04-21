import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

function Nav() {
  return (
    <>
      <Navbar
        className="bg-body-tertiary desktop-nav"
        style={{ position: "fixed", top: "0", width: "100%", zIndex: "10" }}
      >
        <Container>
          <Navbar.Brand href="/">Logo</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "10px",
        backgroundColor: "rgb(70, 135, 70)",
        color: "white",
      }}
    >
      &copy; {new Date().getFullYear()} Copyright : &nbsp;
      <Link style={{ color: "white" }} to="/">
        Crop Cartel
      </Link>
    </div>
  );
}

export default Footer;

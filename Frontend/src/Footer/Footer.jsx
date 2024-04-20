import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Card
      className="footer-card"
      style={{
        fontFamily: "Open Sans",
        color: "var(--sec)",
        alignItems: "center",
        borderStyle: "none",
        borderRadius: "0",
        width: "100%",
        // height: "50px",
        justifyContent: "center",
        backgroundColor: "rgba(227, 243, 246)",
        // marginTop: "35px",
        padding: "none !important",
      }}
    >
      <Card.Body>
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <Link className="text-dark" to="/">
          To be decided
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Footer;

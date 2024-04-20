import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    async function redirectingfunction() {
      try {
        const res = await axios.post("/users/redirecting", {});
        console.log(res);
        if (res.status == 200) {
          navigate("/user/dashboard");
        }
        //  else {
        //   //   navigate("/login");
        // }
      } catch (error) {
        // console.error("error while redirecting: ", error);

        if (error.response) {
          const errorMessage = error.response.data.message;
          console.error("Error from backend:", errorMessage);
        } else if (error.request) {
          console.error("No response received from server");
        } else {
          console.error("Error:", error.message);
        }
      }
    }
    redirectingfunction();
  }, []);
  return (
    <div
      className="page-mid-section"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Card>
        <Card.Header>lorem Ipsum</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>supporting text</Card.Text>
          <Link to="/login">
            <Button variant="primary" className="main-button-css">
              Login
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LandingPage;

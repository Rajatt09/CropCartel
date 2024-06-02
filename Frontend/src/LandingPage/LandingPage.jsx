import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import landing from "./landing.png";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   async function redirectingfunction() {
  //     try {
  //       const res = await axios.post("/users/redirecting", {});
  //       // console.log(res);
  //       if (res.status == 200) {
  //         navigate("/user/dashboard");
  //       }
  //       //  else {
  //       //   //   navigate("/login");
  //       // }
  //     } catch (error) {
  //       // console.error("error while redirecting: ", error);

  //       if (error.response) {
  //         const errorMessage = error.response.data.message;
  //         console.error("Error from backend:", errorMessage);
  //       } else if (error.request) {
  //         console.error("No response received from server");
  //       } else {
  //         console.error("Error:", error.message);
  //       }
  //     }
  //   }
  //   redirectingfunction();
  // }, []);
  return (
    <div className="landing-block" style={{ backgroundColor: "#cefad0" }}>
      <div
        className="page-mid-sectionn"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          textAlign: "center",
        }}
      >
        <div className="landing-heading underline">
          {" "}
          <span
            style={{
              margin: "auto",
              WebkitTextStroke: "1.5px white",
              color: "transparent",
            }}
          >
            Cultivating Connections
          </span>{" "}
          <br /> Farmers Grow, Buyers Prosper
        </div>
        <div
          className="land-box"
          style={{
            // border: "5px solid rgb(70, 135, 70)",
            border: "5px solid rgba(255,255,255, 0.5)",
            borderRadius: "20px",
          }}
        >
          <Card
            className="blur-background"
            style={{
              margin: "5px",
              borderRadius: "10px",
              // backgroundColor: "rgba(159, 183, 124, 0.7)",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(2px)",
            }}
          >
            <Card.Body style={{ color: "white" }}>
              <Card.Title>Explore Crop Cartel </Card.Title>
              <Card.Text>
                Join the Marketplace Where Quality Crops Meet Competitive Prices
              </Card.Text>
              <Link to="/login">
                <Button
                  style={{
                    backgroundColor: "rgb(70, 135, 70)",
                    padding: "12px 30px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >
                  Continue
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

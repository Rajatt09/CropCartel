import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Login.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "react-bootstrap/Toast";

function Login2() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailerror: "",
    passworderror: "",
  });

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up the effect
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(data);

    setErrors({
      emailerror: "",
      passworderror: "",
    });

    if (data.email === "" || !emailRegex.test(data.email)) {
      setErrors((prevData) => ({
        ...prevData,
        emailerror: "invalid",
      }));
      return;
    }
    if (data.password === "") {
      setErrors((prevData) => ({
        ...prevData,
        passworderror: "invalid",
      }));
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`/users/login`, data);
      console.log(res);
      if (res.status == 200) {
        // alert("Login successful");

        navigate("/user/dashboard");
        toast.success(` Login Successful.`);
      } else {
        // alert("Invalid Credentials");
        toast.error(`Invalid user credentials.`);
        return;
      }
    } catch (error) {
      // console.error("error while login : ", error);
      // alert("error occured while login. Please try again later.");
      if (error.response) {
        const errorMessage = error.response.data.message;
        console.error("Error from backend:", errorMessage);
        // alert(errorMessage);
      } else if (error.request) {
        // console.error("No response received from server");
        toast.error(`Error occured while signing in.Please try again later.`);
        // alert("error occured while signing in.Please try again later.");
      } else {
        console.error("Error:", error.message);
        // alert(error.message);
      }
    } finally {
      setLoading(false);
    }

    // If all validations pass, submit the form
    // alert("Form submitted successfully!");
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    // setValidated(true);
  };

  return (
    <div className="login-back">
      <ToastContainer />
      <div className="login-back-inner">
        <div className="login-form">
          <h1
            style={{ textAlign: "center", padding: "35px 0px", color: "white" }}
          >
            Login
          </h1>
          <Form style={{ color: "white" }} onSubmit={handleSubmit}>
            <Row className="mb-3 login-row">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label style={{ color: "white" }}>
                  Email{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="email"
                  type="email"
                  isInvalid={errors.emailerror === "invalid"}
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose an email.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="login-break">
                <br />
              </div>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label style={{ color: "white" }}>
                  Password{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </Form.Label>
                <Form.Control
                  name="password"
                  onChange={handleChange}
                  type="password"
                  isInvalid={errors.passworderror === "invalid"}
                  placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a password.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* <Form.Group className="position-relative mb-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" name="file" />
        </Form.Group> */}
            <div>
              <li>
                New to our website?{" "}
                <Link
                  style={{
                    color: "white",
                    textDecoration: "underline",
                  }}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            </div>

            <div
              className="login-btn"
              style={{ textAlign: "center", padding: "15px" }}
            >
              {/* <Link> */}
              <button
                style={{
                  backgroundColor: "rgb(70, 135, 70)",
                  padding: "8px 40px",
                  fontSize: "1rem",
                  border: "none",
                  borderRadius: "10px",
                }}
                className="main-button-css"
                variant="primary"
                type="submit"
              >
                Login
              </button>
              {/* </Link> */}
            </div>
          </Form>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          zIndex: "20",
          top: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.7)",
          width: "100vw",
          left: "0",
          height: "100vh",

          display: loading ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          // marginBottom: "12px",
        }}
      >
        <Toast
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="spinner-border text-success" role="status"></div>
          <Toast.Body style={{ textAlign: "center" }}>Please Wait</Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default Login2;

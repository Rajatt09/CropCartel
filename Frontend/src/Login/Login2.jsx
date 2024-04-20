import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login2() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailerror: "",
    passworderror: "",
  });

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
    console.log(data);

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

    try {
      const res = await axios.post(`/users/login`, data);
      console.log(res);
      if (res.status == 200) {
        alert("Login successful");
        navigate("/user/dashboard");
      } else {
        alert("Invalid Credentials");
        return;
      }
    } catch (error) {
      // console.error("error while login : ", error);
      // alert("error occured while login. Please try again later.");
      if (error.response) {
        const errorMessage = error.response.data.message;
        console.error("Error from backend:", errorMessage);
        alert(errorMessage);
      } else if (error.request) {
        // console.error("No response received from server");
        alert("error occured while signing in.Please try again later.");
      } else {
        console.error("Error:", error.message);
        alert(error.message);
      }
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
    <div className="login-form">
      <h1 style={{ textAlign: "center", padding: "35px 0px" }}>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3 login-row">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
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
            <Form.Label>Password</Form.Label>
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
            New to our website? <Link to="/signup">Sign Up</Link>
          </li>
        </div>

        <div
          className="login-btn"
          style={{ textAlign: "center", padding: "15px" }}
        >
          {/* <Link> */}
          <Button className="main-button-css" variant="primary" type="submit">
            Submit
          </Button>
          {/* </Link> */}
        </div>
      </Form>
    </div>
  );
}

export default Login2;

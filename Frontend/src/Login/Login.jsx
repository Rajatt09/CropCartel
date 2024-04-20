import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import ApiCall from "../../utils/ApiCall";
import axios from "axios";
import { useEffect, useState } from "react";

function Login({ setUserProfile }) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    name: "",
    age: "",
    phnumber: "",
    aadhar: "",
    upiId: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    // password: "",
  });
  const [errors, setErrors] = useState({
    nameerror: "",
    ageerror: "",
    phnumbererror: "",
    aadharerror: "",
    upiIderror: "",
    cityerror: "",
    stateerror: "",
    zipCodeerror: "",
    emailerror: "",
    // passworderror: "",
  });

  const capitalizeFirstLetter = (str) => {
    if (str && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return "";
    }
  };

  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const response = await ApiCall("/users/getDetails", "GET", null);
        const temp = response.data.data || {};

        setData(temp);

        console.log("temp again: ", temp);
        console.log("Modal Data", data);
      } catch (error) {
        console.error(
          "Error while fetching User in editing user detail: ",
          error
        );
      }
    };
    getuserdetails();
  }, []);

  const ageRegex = /^[0-9]+$/;
  const phoneRegex = /^\d{10}$/;
  const aadharRegex = /^\d{12}$/;
  const zipRegex = /^\d{6}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const upiIdRegex = /^[\w.-]+@[\w.-]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("pressed", data);

    setErrors({
      nameerror: "",
      ageerror: "",
      phnumbererror: "",
      aadharerror: "",
      upiIderror: "",
      cityerror: "",
      stateerror: "",
      zipCodeerror: "",
      emailerror: "",
      // passworderror: "",
    });

    if (data.name === "") {
      setErrors((prevData) => ({
        ...prevData,
        nameerror: "invalid",
      }));
      return;
    }

    if (data.email === "" || !emailRegex.test(data.email)) {
      setErrors((prevData) => ({
        ...prevData,
        emailerror: "invalid",
      }));
      return;
    }

    if (data.phnumber === "" || !phoneRegex.test(data.phnumber)) {
      setErrors((prevData) => ({
        ...prevData,
        phnumbererror: "invalid",
      }));
      return;
    }
    try {
      const response = await ApiCall(
        "/users/updateAccountDetails",
        "POST",
        data
      );
      const temp = response.data.data || {};

      setData(temp);
      // navigate("/dashboard");
      window.location.reload();

      console.log("temp", temp);
    } catch (error) {
      console.error("Error while updating user details: ", error);
    }

    // if (data.aadhar === "" || !aadharRegex.test(data.aadhar)) {
    //   setErrors((prevData) => ({
    //     ...prevData,
    //     aadharerror: "invalid",
    //   }));
    // }
    // if (data.upiId === "" || !upiIdRegex.test(data.upiId)) {
    //   setErrors((prevData) => ({
    //     ...prevData,
    //     upiIderror: "invalid",
    //   }));
    // }
    // if (data.city === "") {
    //   setErrors((prevData) => ({
    //     ...prevData,
    //     cityerror: "invalid",
    //   }));
    // }
    // if (data.state === "") {
    //   setErrors((prevData) => ({
    //     ...prevData,
    //     stateerror: "invalid",
    //   }));
    // }
    // if (data.zipCode === "" || !zipRegex.test(data.zipCode)) {
    //   setErrors((prevData) => ({
    //     ...prevData,
    //     zipCodeerror: "invalid",
    //   }));
    // }

    // if (data.password === "") {
    //   setErrors((prevData) => ({
    //     ...prevData,
    //     passworderror: "invalid",
    //   }));
    // }

    // if (data.age === "" || !ageRegex.test(data.age)) {
    //   setErrors((prevData) => ({
    //     ...prevData,
    //     ageerror: "invalid",
    //   }));
    // }

    // If all validations pass, submit the form
    // alert("Form submitted successfully!");
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    // setValidated(true);
  };

  return (
    <div className="login-form-modal">
      <h2 style={{ textAlign: "center", padding: "35px 0px" }}>
        Update Your Profile
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3 login-row">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={capitalizeFirstLetter(data.name) || ""}
              name="name"
              type="text"
              placeholder="Enter name"
              isInvalid={errors.nameerror === "invalid"}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="login-break">
            <br />
          </div>
          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={data.age || ""}
              name="age"
              type="text"
              placeholder="Age"
              isInvalid={errors.ageerror === "invalid"}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid age.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="login-break">
            <br />
          </div>
          <Form.Group as={Col} controlId="formGridNumber">
            <Form.Label>Number</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={data.phnumber || ""}
              name="phnumber"
              type="text"
              placeholder="Phone Number"
              isInvalid={errors.phnumbererror === "invalid"}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your valid phone number.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3 login-row">
          <Form.Group as={Col} controlId="formGridaadharnumber">
            <Form.Label>Aadhar Number</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={data.aadhar || ""}
              name="aadhar"
              type="text"
              placeholder="aadhar number"
              isInvalid={errors.aadharerror === "invalid"}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your valid aadhar number.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="login-break">
            <br />
          </div>
          <Form.Group as={Col} controlId="formGridupiid">
            <Form.Label>UPI Id</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={data.upiId || ""}
              name="upiId"
              type="text"
              placeholder="upi id"
              isInvalid={errors.upiIderror === "invalid"}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your valid upi id.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3 login-row">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              onChange={handleChange}
              placeholder="enter city"
              name="city"
              type="text"
              isInvalid={errors.cityerror === "invalid"}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="login-break">
            <br />
          </div>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control
              name="state"
              placeholder="enter state"
              isInvalid={errors.stateerror === "invalid"}
              onChange={handleChange}
              value={data.state || ""}
            />
            {/* <Form.Select
              name="state"
              isInvalid={errors.stateerror === "invalid"}
              onChange={handleChange}
              value={data.state}
            >
              <option value="" disabled>
                Choose...
              </option>
              <option>State 1</option>
              <option>State 2</option>
              
            </Form.Select> */}
            <Form.Control.Feedback type="invalid">
              Please enter your state.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="login-break">
            <br />
          </div>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              name="zipCode"
              placeholder="enter zip code"
              value={data.zipCode || ""}
              isInvalid={errors.zipCodeerror === "invalid"}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your zip code.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="login-break">
          <br />
        </div>
        <Row className="mb-3 login-row">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={data.email || ""}
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
          {/* <Form.Group as={Col} controlId="formGridPassword">
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
          </Form.Group> */}
        </Row>

        {/* <Form.Group className="position-relative mb-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" name="file" />
        </Form.Group> */}

        <div
          className="login-btn"
          style={{ textAlign: "center", padding: "15px" }}
        >
          <Button className="main-button-css" variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./EditItem.css";
import { useNavigate } from "react-router-dom";
import ApiCall from "../../utils/ApiCall";
import axios from "axios";
import { useEffect, useState } from "react";

function CommonItem({ name, id }) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    name: "",
    category: "",
    quantity: "",
    // description: "",
    // timePeriod: "",
    status: "",
    basePrice: "",
  });
  const [errors, setErrors] = useState({
    nameerror: "",
    categoryerror: "",
    quantityerror: "",
    // descriptionerror: "",
    // timePerioderror: "",
    basePriceerror: "",

    // cropImage: ""
  });

  const capitalizeFirstLetter = (str) => {
    if (str && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return "";
    }
  };

  const quantityRegex = /^[0-9]+$/;
  const priceRegex = /^\d+(\.\d{1,2})?$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (val) => {
    console.log("val is : ", val);
    console.log("commonitem : ", data);

    setErrors({
      nameerror: "",
      categoryerror: "",
      quantityerror: "",
      //   descriptionerror: "",
      //   timePerioderror: "",
      basePriceerror: "",
      statuserror: "",
    });

    if (data.name === "") {
      setErrors((prevData) => ({
        ...prevData,
        nameerror: "invalid",
      }));
      return;
    }

    if (data.category === "") {
      setErrors((prevData) => ({
        ...prevData,
        categoryerror: "invalid",
      }));
      return;
    }

    if (data.quantity === "" || !quantityRegex.test(data.quantity)) {
      setErrors((prevData) => ({
        ...prevData,
        quantityerror: "invalid",
      }));
      return;
    }
    if (data.basePrice === "" || !priceRegex.test(data.basePrice)) {
      setErrors((prevData) => ({
        ...prevData,
        basePriceerror: "invalid",
      }));
      return;
    }
    const updatedData = {
      ...data,
      status: val,
    };

    if (name == "Edit") {
      try {
        console.log("data in edit item is :", updatedData);

        const response = await axios.put(`/users/getItems/${id}`, {
          product: updatedData,
        });
        if (response) {
          console.log("saved item is updated successfully");
        }
        window.location.reload();
      } catch (error) {
        console.error("Error while editing item detail: ", error);
      }
    } else if (name == "Add") {
      try {
        console.log("data in edit item is :", updatedData);

        const response = await ApiCall(`/users/addItem`, "POST", {
          product: updatedData,
        });
        if (response) {
          console.log("item is added successfully");
        }
        window.location.reload();
      } catch (error) {
        console.error("Error while adding item: ", error);
      }
    }
    // try {
    //   const response = await ApiCall(
    //     "/users/updateAccountDetails",
    //     "POST",
    //     data
    //   );
    //   const temp = response.data.data || {};

    //   setData(temp);
    //   window.location.reload();

    //   console.log("temp", temp);
    // } catch (error) {
    //   console.error("Error while adding item details: ", error);
    // }
  };

  return (
    <div className="login-form-modal">
      <h2 style={{ textAlign: "center", padding: "0px 0px" }}>{name} Item</h2>

      <Row className="mb-3 mt-4 login-row">
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
            Please enter item name.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="login-break">
          <br />
        </div>
        <Form.Group as={Col} controlId="formGridAge">
          <Form.Label>Category</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={data.category || ""}
            name="category"
            type="text"
            placeholder="category"
            isInvalid={errors.categoryerror === "invalid"}
          />
          <Form.Control.Feedback type="invalid">
            Please enter item category.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="login-break">
          <br />
        </div>
        <Form.Group as={Col} controlId="formGridNumber">
          <Form.Label>Quanity</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={data.quantity || ""}
            name="quantity"
            type="text"
            placeholder="Quanity"
            isInvalid={errors.quantityerror === "invalid"}
          />
          <Form.Control.Feedback type="invalid">
            Please enter item quantity.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3 login-row">
        <Form.Group as={Col} controlId="formGridaadharnumber">
          <Form.Label>Base Price</Form.Label>
          {/* <Form.Control
              onChange={handleChange}
              value={data.basePrice || ""}
              name="basePrice"
              type="text"
              placeholder="base price"
              isInvalid={errors.basePriceerror === "invalid"}
            /> */}
          <InputGroup className="mb-3">
            <InputGroup.Text>&#8377;</InputGroup.Text>
            <Form.Control
              onChange={handleChange}
              value={data.basePrice || ""}
              name="basePrice"
              type="text"
              placeholder="base price"
              isInvalid={errors.basePriceerror === "invalid"}
            />
            <Form.Control.Feedback type="invalid">
              Please enter base price for your item.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <div className="login-break">
          <br />
        </div>
        <Form.Group as={Col} controlId="formGridupiid">
          <Form.Label>Time Period</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={data.upiId || ""}
            name="timePeriod"
            type="text"
            placeholder="time period"
            isInvalid={errors.timePerioderror === "invalid"}
          />
          <Form.Control.Feedback type="invalid">
            Please enter time period.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="position-relative mb-3">
        <Form.Label>Photo </Form.Label>
        <Form.Control type="file" name="file" />
      </Form.Group>
      <div className="login-break">
        <br />
      </div>
      <Row className="mb-3 login-row">
        <Form.Group as={Col} controlId="formGridDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={handleChange}
            value={data.description || ""}
            name="description"
            placeholder="Enter item description"
            isInvalid={errors.descriptionerror === "invalid"}
          />
          <Form.Control.Feedback type="invalid">
            Please enter item description.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <div
        className="login-btn"
        style={{ textAlign: "center", padding: "15px" }}
      >
        <Button
          className="main-button-css"
          variant="primary"
          type="submit"
          onClick={() => handleSubmit("saved")}
        >
          Save
        </Button>{" "}
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <Button
          onClick={() => handleSubmit("posted")}
          className="main-button-css"
          variant="primary"
          type="submit"
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default CommonItem;

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
import "./Commonitem.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "react-bootstrap/Toast";

function CommonItem({ name, id }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState({
    name: "",
    category: "",
    quantity: "",
    description: "",
    timePeriod: "",
    status: "",
    basePrice: "",
  });
  const [errors, setErrors] = useState({
    nameerror: "",
    categoryerror: "",
    quantityerror: "",
    descriptionerror: "",
    timePerioderror: "",
    basePriceerror: "",

    // cropImage: "",
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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
    // console.log("name : ", name, "value : ", value);
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (val) => {
    // console.log("val is : ", val);
    // console.log("commonitem : ", data);

    setErrors({
      nameerror: "",
      categoryerror: "",
      quantityerror: "",
      descriptionerror: "",
      timePerioderror: "",
      basePriceerror: "",
      statuserror: "",
      // cropImage: "",
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

    if (data.description === "") {
      setErrors((prevData) => ({
        ...prevData,
        descriptionerror: "invalid",
      }));
      return;
    }

    if (data.timePeriod === "") {
      setErrors((prevData) => ({
        ...prevData,
        timePerioderror: "invalid",
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
    let updatedData = {
      ...data,
      status: val,
    };

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("quantity", data.quantity);
    formData.append("description", data.description);
    formData.append("timePeriod", data.timePeriod);
    formData.append("basePrice", data.basePrice);
    formData.append("status", val);

    if (selectedFile) {
      // updatedData = { ...updatedData, cropImage: selectedFile };
      formData.append("cropImage", selectedFile);
    }

    setLoading(true);

    if (name == "Edit") {
      try {
        // console.log("data in edit item is :", updatedData);

        const response = await axios.put(`/users/getItems/${id}`, formData);
        if (response) {
          console.log("saved item is updated successfully", response);
        }
        window.location.reload();
        // toast.success(`item updated successfully`);
      } catch (error) {
        // console.error("Error while editing item detail: ", error);
        toast.error(`Something went wrong. Please try again later.`);
      } finally {
        setLoading(false);
      }
    } else if (name == "Add") {
      try {
        // console.log("data in edit item is :", updatedData);
        const response = await ApiCall(`/users/addItem`, "POST", formData);
        if (response) {
          console.log("item is added successfully", response);
        }
        window.location.reload();
      } catch (error) {
        // console.error("Error while adding item: ", error);
        toast.error(`Error occured while adding item ,Please try again later.`);
      } finally {
        setLoading(false);
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
    <div className="common-item-back">
      <ToastContainer />
      <div className="login-form-modal ">
        <h2
          style={{
            textAlign: "center",
            padding: "20px 0px",
          }}
        >
          <span
            style={{
              borderLeft: "4px solid white",
              borderRight: "4px solid white",
              padding: "10px 40px",
              borderRadius: "50%",
            }}
          >
            {" "}
            {name} Item
          </span>
        </h2>

        <Row className="mb-3 mt-4 login-row">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={capitalizeFirstLetter(data.name) || ""}
              className="inputField"
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
              className="inputField"
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
              className="inputField"
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
              <InputGroup.Text
                style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
              >
                &#8377;
              </InputGroup.Text>
              <Form.Control
                className="inputField"
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
              value={data.timePeriod}
              name="timePeriod"
              type="datetime-local"
              placeholder="time period"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
              isInvalid={errors.timePerioderror === "invalid"}
            />

            {/* <div>
            <input
              type="datetime-local"
              id="datetime"
              style={{
                borderColor: "white",
                borderRadius: "2.4px",
                height: "35px",
                width: "100%",
                border: "none",
              }}
              className="inputField"
              value={data.timePeriod}
              onChange={handleChange}
              name="timePeriod"
            />
          </div> */}

            {errors.timePerioderror === "invalid" ? (
              <Form.Control.Feedback>
                Please enter time period.
              </Form.Control.Feedback>
            ) : (
              ""
            )}
          </Form.Group>
        </Row>

        <Form.Group className="position-relative mb-3">
          <Form.Label>Photo </Form.Label>
          <Form.Control
            className="inputField"
            type="file"
            name="cropImage"
            accept="image/*"
            onChange={handleFileChange}
          />
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
              className="inputField"
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
            style={{
              backgroundColor: "rgb(70, 135, 70)",
              padding: "10px 40px",
              fontSize: "0.8rem",
            }}
            type="submit"
            onClick={() => handleSubmit("saved")}
          >
            Save
          </Button>{" "}
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <Button
            style={{
              backgroundColor: "rgb(70, 135, 70)",
              padding: "10px 40px",
              fontSize: "0.8rem",
            }}
            onClick={() => handleSubmit("posted")}
            type="submit"
          >
            Post
          </Button>
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

export default CommonItem;

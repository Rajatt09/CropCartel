import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./ParticularItem.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useParams } from "react-router-dom";
import ApiCall from "../../utils/ApiCall";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import io from "socket.io-client";

function ParticularItem() {
  const socket = io.connect("http://localhost:8001");

  const id = useParams().id;

  const [item, setItem] = useState({});
  const [data, setData] = useState({});
  const [userProfile, setUserProfile] = useState({
    price: "",
  });
  const [errors, setErrors] = useState({
    priceError: "",
  });
  useEffect(() => {
    const getitemdetails = async () => {
      try {
        const response = await ApiCall(`/users/getItems/${id}`, "GET", null);
        const response2 = await ApiCall("/users/getDetails", "GET", null);
        const temp2 = response2.data.data || {};

        setUserProfile(temp2);

        // console.log("temp", temp);
        console.log("userData is here :", userProfile);
        const temp = response.data.data || {};

        setItem(temp);

        console.log("temp", temp);
        console.log("itemData", item);
      } catch (error) {
        console.error("Error while fetching particular item: ", error);
      }
    };
    getitemdetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("bid price is : ", data);

    setErrors({
      priceError: "",
    });

    if (data === "" || Number(data) <= Number(item.basePrice)) {
      setErrors((prevData) => ({
        ...prevData,
        priceError: "invalid",
      }));
      return;
    }

    // const bidding = async () => {
    //   try {
    //     const response = await ApiCall("", "POST", {});
    //     const temp = response.data.data || {};

    //     setData(temp);

    //     console.log("temp", temp);
    //     console.log("bidData", data);
    //   } catch (error) {
    //     console.error("Error while bidding : ", error);
    //   }
    // };
    // bidding();

    const new_bid = {
      _id_user: userProfile._id,
      _id_item: item._id,
      currentPrice: Number(data.price),
    };
    console.log("Inside Frontend:", new_bid);
    socket.emit("send_message", new_bid);
    setData(() => ({
      price: "",
    }));
  };

  useEffect(() => {
    socket.on("receive_message", (new_item) => {
      setItem(new_item);
    });
  }, [socket]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // You can customize the date format as needed
  };
  const capitalizeFirstLetter = (str) => {
    if (str?.length > 0) {
      return str?.charAt(0).toUpperCase() + str?.slice(1);
    }
    return str;
  };

  return (
    <div className="page-mid-section2">
      <h1 style={{ textAlign: "center", paddingTop: "20px" }}>
        ITEM : {capitalizeFirstLetter(item?.name)}
      </h1>
      <MDBContainer fluid>
        <MDBRow className="justify-content-center mb-0">
          <MDBCol md="12" xl="9">
            <MDBCard className="shadow-0 border rounded-3 mt-4 mb-3">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol
                    md="12"
                    lg="3"
                    className="mb-4 mb-lg-0 d-flex flex-row align-items-center"
                  >
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom hover-overlay"
                    >
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                        fluid
                        className="w-100"
                      />
                      <a href="#!">
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        ></div>
                      </a>
                    </MDBRipple>
                  </MDBCol>
                  <MDBCol md="6" lg="5">
                    <h5>{capitalizeFirstLetter(item?.name)}</h5>
                    <div className="d-flex flex-row justify-content-between">
                      {/* <div className="text-danger mb-1 me-2">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                      </div> */}
                      <span>
                        Category : {capitalizeFirstLetter(item.category)}
                      </span>
                    </div>
                    <div className="d-flex mb-2 flex-row justify-content-between">
                      <span>Quantity : {item.quantity}</span>
                    </div>

                    <p className=" mb-4 mb-md-0">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                    <div>
                      <h4 className="mb-2 mt-2 me-1">
                        Available to bid till : {formatDate(item?.expiry)}
                      </h4>
                    </div>

                    <div className="mb-2 text-muted small">
                      <span>Date Listed : {formatDate(item.updatedAt)}</span>
                    </div>
                  </MDBCol>

                  <MDBCol
                    md="6"
                    lg="3"
                    className="border-sm-start-none border-start"
                  >
                    <div>
                      <h4

                      // className="mb-1 me-1"
                      >
                        {" "}
                        Base Price : &#8377;{item.basePrice}
                      </h4>
                      <h4

                      // className="mb-1 me-1"
                      >
                        {" "}
                        Current Price : &#8377;{item?.currentPrice || "0.00"}
                      </h4>
                      {/* <span className="text-danger">
                        <s>$20.99</s>
                      </span> */}
                    </div>
                    <h6 className="text-success mt-4">Make Bid : </h6>
                    <div className="d-flex flex-column mt-2">
                      <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>&#8377;</InputGroup.Text>
                          <Form.Control
                            name="price"
                            onChange={handleChange}
                            type="text"
                            pattern="[0-9]*"
                            isInvalid={errors.priceError === "invalid"}
                            placeholder="Enter Your Amount"
                            aria-label="Amount you wnat to make bid of "
                          />

                          <Form.Control.Feedback type="invalid">
                            Please enter a fair price.
                          </Form.Control.Feedback>
                          {/* <InputGroup.Text>.00</InputGroup.Text> */}
                        </InputGroup>
                        <Button
                          className="mt-3"
                          color="primary"
                          size="sm"
                          type="submit"
                        >
                          Make Bid
                        </Button>
                      </Form>
                      {/* <MDBBtn
                        outline
                        color="primary"
                        size="sm"
                        className="mt-2"
                      >
                        Add to wish list
                      </MDBBtn> */}
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ParticularItem;

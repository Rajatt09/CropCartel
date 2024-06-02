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
import Toast from "react-bootstrap/Toast";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ParticularItem() {
  const socket = io.connect(import.meta.env.VITE_SOCKET_SERVER_URL);

  const id = useParams().id;

  const [Confirm, setConfirm] = useState(false);

  const [item, setItem] = useState({});
  const [data, setData] = useState({ price: "" });
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
        // console.log("userData is here :", userProfile);
        const temp = response.data.data || {};

        setItem(temp);

        // console.log("temp", temp);
        // console.log("itemData", item);
      } catch (error) {
        console.error("Error while fetching particular item: ", error);
      }
    };
    getitemdetails();
  }, []);

  useEffect(() => {
    if (Confirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up the effect
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [Confirm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function confirm(event) {
    event.preventDefault();
    // return;
    setErrors({
      priceError: "",
    });

    if (
      // isNaN(Number(data)) ||
      data.price === "" ||
      Number(data.price) <= Number(item.basePrice) ||
      Number(data.price) <= Number(item?.currentPrice)
    ) {
      setErrors((prevData) => ({
        ...prevData,
        priceError: "invalid",
      }));
      return;
    }
    setConfirm(true);
  }

  function Confirm2() {
    setConfirm(false);
    setData({ price: "" });
    toast.success(`You have made bid successfully.`);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("bid price is : ", typeof Number(data));
    // console.log("current price is : ", typeof Number(item.basePrice));
    setErrors({
      priceError: "",
    });

    if (
      // isNaN(Number(data)) ||
      data.price === "" ||
      Number(data.price) <= Number(item.basePrice) ||
      Number(data.price) <= Number(item?.currentPrice)
    ) {
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
    // console.log("Inside Frontend:", new_bid);
    socket.emit("send_message", new_bid);
    setData(() => ({
      price: "",
    }));

    // setConfirm(false);
    // setData(""),
    Confirm2();
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
    <>
      <div
        className="particular-wrapper"
        style={{
          // backgroundColor: "gray",
          marginBottom: "12px",
          backdropFilter: "blur(14px)",
        }}
      >
        <ToastContainer />
        <div className="page-mid-section2">
          <h1
            style={{
              textAlign: "center",
              paddingTop: "40px",
              paddingBottom: "20px",
            }}
          >
            <span
              style={{
                borderLeft: "4px solid white",
                borderRight: "4px solid white",
                padding: "15px 40px",
                borderRadius: "50%",
              }}
            >
              {" "}
              Item : {capitalizeFirstLetter(item?.name)}
            </span>
          </h1>
          <MDBContainer fluid>
            <MDBRow className="justify-content-center mb-0">
              <MDBCol md="12" xl="9">
                <MDBCard
                  className="rounded-3 mt-4 mb-3"
                  style={{
                    backdropFilter: "blur(4px)",
                    backgroundColor: "rgba(255,255,255,0.6)",
                    // -webkit-backdrop-filter: blur(4px),
                    border: "4px solid rgb(70, 135, 70)",
                  }}
                >
                  <MDBCardBody>
                    <MDBRow
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <MDBCol
                        md="12"
                        lg="3"
                        className="saved-pic-length"
                        style={{
                          backgroundImage:
                            item.cropImage !== ""
                              ? `url(${item.cropImage})`
                              : "none",
                          backgroundColor:
                            item.cropImage === ""
                              ? "rgba(127,127,127,0.7)"
                              : "transparent",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "5px",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          // minHeight: "350px",
                        }}
                        // className="mb-4 mb-lg-0 d-flex flex-row align-items-center"
                      >
                        {item.cropImage == "" ? (
                          <div
                            style={{
                              padding: "auto",
                              color: "white",
                              height: "fit-content",
                            }}
                          >
                            Image is not available
                          </div>
                        ) : (
                          ""
                        )}
                      </MDBCol>
                      <MDBCol md="6" lg="5">
                        <h3>{capitalizeFirstLetter(item?.name)}</h3>
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
                          available, but the majority have suffered alteration
                          in some form, by injected humour, or randomised words
                          which don't look even slightly believable.
                        </p>
                        <div style={{ marginTop: "15px" }}>
                          <span className="mb-2 mt-0 text-muted small">
                            Last Date to bid : {formatDate(item?.expire)}
                          </span>
                        </div>

                        <div className="mb-4 text-muted small">
                          <span>
                            Date Listed : {formatDate(item.updatedAt)}
                          </span>
                        </div>
                      </MDBCol>

                      <MDBCol
                        md="6"
                        lg="3"
                        className="border-sm-start-none border-start"
                      >
                        <div>
                          <h5

                          // className="mb-1 me-1"
                          >
                            {" "}
                            Base Price : &#8377;{item.basePrice}
                          </h5>
                          <h5
                          // style={{ fontWeight: "500" }}
                          // className="mb-1 me-1"
                          >
                            {" "}
                            Current Price : &#8377;
                            {item?.currentPrice || "0.00"}
                          </h5>
                          {/* <span className="text-danger">
                        <s>$20.99</s>
                      </span> */}
                        </div>
                        <h6
                          className="text-success mt-4"
                          style={{ fontWeight: "600" }}
                        >
                          Enter Bid Price :{" "}
                        </h6>
                        <div className="d-flex flex-column mt-2">
                          <Form onSubmit={confirm}>
                            <InputGroup className="mb-3">
                              <InputGroup.Text
                                style={{ backgroundColor: "white" }}
                              >
                                &#8377;
                              </InputGroup.Text>
                              <Form.Control
                                name="price"
                                onChange={handleChange}
                                type="text"
                                pattern="[0-9]*"
                                value={data.price}
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
                              style={{
                                marginTop: "12px",
                                padding: "10px 30px",
                                backgroundColor: "rgb(70, 135, 70)",
                                fontWeight: "600",
                              }}
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
      </div>
      <div
        style={{
          position: "fixed",
          zIndex: "20",
          top: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.7)",
          width: "100%",
          height: "100vh",

          display: Confirm ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          // marginBottom: "12px",
        }}
      >
        <Toast onClose={() => setConfirm(false)}>
          <Toast.Header closeButton>
            {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
            <strong className="me-auto"></strong>
            <small></small>
            {/* <CloseButton onClick={() => setConfirm(false)} /> */}
          </Toast.Header>
          <Toast.Body style={{ textAlign: "center" }}>
            Are you sure you want to make a bid ?
          </Toast.Body>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <Button
              onClick={handleSubmit}
              style={{
                textAlign: "center",
                margin: "auto",
                backgroundColor: "rgb(70, 135, 70)",
                fontWeight: "bold",
              }}
            >
              Yes
            </Button>
          </div>
        </Toast>
      </div>
    </>
  );
}

export default ParticularItem;

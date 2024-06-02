import React from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBBadge,
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiCall from "../../utils/ApiCall";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Toast from "react-bootstrap/Toast";
import CloseButton from "react-bootstrap/esm/CloseButton";
import "./ParticularItem.css";

export default function BidderHistory({ type, status }) {
  const { id } = useParams;
  const [items, setItems] = useState([]);
  const [Confirm, setConfirm] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [typebox, setType] = useState(2);

  const handleDelete = async () => {
    console.log("item to be deleted :", Confirm);
    // console.log("item to be sent : ", {
    //   type: "buyer",
    //   id: Confirm._id,
    // });
    try {
      const response = await ApiCall("/users/getDelete", "POST", {
        type: "buyer",
        id: Confirm._id,
      });
      if (response) {
        // console.log("saved item deleted successfully");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting items: ", error);
    }
    setConfirm(null);
    setSelectedItem(null);
    setType(2);
  };

  useEffect(() => {
    const getitemdetails = async () => {
      try {
        let response;

        response = await ApiCall("/users/getBought", "GET", null);

        const temp = response.data.data || {};

        setItems(temp);

        // console.log("temp", temp);
        // console.log("history", items);
      } catch (error) {
        console.error("Error while fetching history: ", error);
      }
    };
    getitemdetails();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up the effect
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedItem]);

  function confirm(item, a) {
    if (a == 1) {
      setConfirm(item);
    }
    setType(a);
    setSelectedItem(item);
  }

  const description =
    "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.";
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + " .....";
    } else {
      return text;
    }
  };
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
    <div
      className="history-wrap"
      style={{ backgroundColor: "gray", marginBottom: "12px" }}
    >
      <div
        className="page-mid-section2"
        style={{ marginTop: "-8px", paddingBottom: "0.1px" }}
      >
        <h2
          style={{
            textAlign: "center",
            margin: "8px 0px 14px 0px",
            paddingTop: "40px",
            paddingBottom: "20px",
          }}
        >
          <span
            style={{
              borderLeft: "4px solid white",
              borderRight: "4px solid white",
              padding: "15px 45px",
              borderRadius: "50%",
            }}
          >
            {type} History
          </span>
        </h2>
        <div
          style={{
            width: "90%",
            // backgroundColor: "black",
            margin: "20px auto 20px",
            display: "flex",
            height: "fit-content",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {items.map((item, index) => (
            <div
              className="bid-width-cl"
              key={index}
              // style={{ minWidth: "100%" }}
            >
              <MDBCard
                className="itemlisting-img"
                style={{
                  // maxHeight: "540px",

                  backgroundColor: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(4px)",
                  // -webkit-backdrop-filter: blur(4px),
                  border: "4px solid rgb(70, 135, 70)",
                  boxShadow: "4px 4px 40px 6px rgba(70, 135, 70,0.4)",
                  maxHeight: "fit-content",
                  borderRadius: "10px",
                  marginBottom: "40px",
                }}
              >
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="history-pic-length "
                    style={{
                      backgroundImage:
                        item.cropImage !== ""
                          ? `url(${item.cropImage})`
                          : "none",
                      backgroundColor:
                        !item.cropImage || item.cropImage == ""
                          ? "rgba(127,127,127,0.7)"
                          : "transparent",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",

                      // minHeight: "200px",
                      // margin: "20px 20px",
                    }}
                  >
                    {!item.cropImage || item.cropImage == "" ? (
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
                    {/* <img
                      style={{
                        borderRadius: "10px",
                        width: "80%",
                        height: "220px",
                        objectFit: "cover",
                      }}
                      className="dashboard-item-pic"
                      src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp"
                      alt="..."
                    /> */}
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <MDBCardTitle>
                          {capitalizeFirstLetter(item?.name)}
                        </MDBCardTitle>
                        <MDBCardTitle>
                          {capitalizeFirstLetter(item?.category)}
                        </MDBCardTitle>
                      </div>

                      <MDBCardText>
                        {truncateText(item?.description, 200000)}
                      </MDBCardText>
                      {/* <p className="text-truncate mb-4 mb-md-0">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p> */}
                      <MDBCardText>
                        <span className="text-muted">
                          Base Price : &#x20B9; {item.basePrice}
                          &nbsp; &nbsp; {type} Price : &#x20B9;{" "}
                          {item.basePrice || ""}
                        </span>
                      </MDBCardText>
                      <MDBCardText>
                        <small className="text-muted">
                          Status : &nbsp; &nbsp;
                          <MDBBadge color="success" pill>
                            Bought
                          </MDBBadge>
                        </small>
                      </MDBCardText>
                      <MDBCardText
                        className="history-time"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <small className="text-muted">
                          Created on :{formatDate(item.updatedAt)}
                        </small>
                        <small className="text-muted">
                          Last Date for Bid :{formatDate(item.expire)}
                        </small>
                      </MDBCardText>
                      <MDBCardText
                        className="history-time"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {item?.currentPrice ? (
                          <Button
                            style={{
                              backgroundColor: "rgb(70, 135, 70)",
                              marginBottom: "10px",
                              fontWeight: "600",
                              fontSize: "0.8rem",
                            }}
                            onClick={() => confirm(item, 0)}
                          >
                            View Seller's Detail
                          </Button>
                        ) : (
                          <Button
                            style={{
                              backgroundColor: "transparent",
                              marginBottom: "10px",
                              boxShadow: "none",
                              fontWeight: "600",
                              fontSize: "0.8rem",
                              color: "red",
                            }}
                          >
                            Seller's Detail is not available
                          </Button>
                        )}
                        <Button
                          variant="danger"
                          style={{
                            marginBottom: "10px",
                            fontWeight: "600",
                            fontSize: "0.8rem",
                          }}
                          onClick={() => confirm(item, 1)}
                        >
                          Delete this item
                        </Button>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
              <div
                style={{
                  position: "fixed",
                  zIndex: "200",
                  top: "0",
                  left: "0",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  width: "100%",
                  height: "100vh",
                  // marginTop: "-62px",
                  display: selectedItem ? "flex" : "none",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginBottom: "12px",
                }}
              >
                {typebox === 0 ? (
                  <Toast
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                    onClose={() => {
                      // setConfirm(false);
                      setSelectedItem(null);
                      setType(2);
                    }}
                  >
                    <Toast.Header
                      style={{
                        backgroundColor: "rgba(70, 135, 70,0.8)",
                        color: "white",
                      }}
                      closeButton
                    >
                      {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                      <strong className="me-auto">
                        Item name : {capitalizeFirstLetter(selectedItem?.name)}
                      </strong>
                      <small></small>
                      {/* <CloseButton onClick={() => setConfirm(false)} /> */}
                    </Toast.Header>
                    <Toast.Body style={{ textAlign: "center" }}>
                      <div>
                        <p>
                          <strong>Seller's Detail</strong>
                        </p>
                        <div style={{ textAlign: "left" }}>
                          Name :{" "}
                          {capitalizeFirstLetter(selectedItem?.sellerName) ||
                            "Not Available"}{" "}
                          <br />
                          Email :{" "}
                          {selectedItem?.sellerEmail || "Not  Available"} <br />
                          Phone number :{" "}
                          {selectedItem?.sellerPhone || "Not Available"} <br />
                          Address : <br /> City :{" "}
                          {capitalizeFirstLetter(selectedItem?.sellerCity) ||
                            "Not Available"}{" "}
                          <br />
                          State :{" "}
                          {capitalizeFirstLetter(selectedItem?.sellerState) ||
                            "Not Available"}
                        </div>
                      </div>
                      {/* Are you sure you want to make a bid ? */}
                    </Toast.Body>
                  </Toast>
                ) : (
                  ""
                )}
                {typebox === 1 ? (
                  <Toast
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                    onClose={() => {
                      // setConfirm(false);
                      setSelectedItem(null);
                      setType(2);
                    }}
                  >
                    <Toast.Header closeButton>
                      {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                      <strong className="me-auto"></strong>
                      <small></small>
                      {/* <CloseButton onClick={() => setConfirm(false)} /> */}
                    </Toast.Header>
                    <Toast.Body style={{ textAlign: "center" }}>
                      Are you sure you want to delete this item ?
                    </Toast.Body>
                    <div style={{ display: "flex", marginBottom: "20px" }}>
                      <Button
                        onClick={handleDelete}
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
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}

          {items.length === 0 ? (
            <div
              style={{
                position: "absolute",
                top: "70px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "90vh",
              }}
            >
              <h3>Bought history is empty</h3>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

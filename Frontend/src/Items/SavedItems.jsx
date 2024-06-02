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
  MDBBadge,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./ParticularItem.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useParams } from "react-router-dom";
import ApiCall from "../../utils/ApiCall";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ItemModal from "../Modal/ItemModal";
import axios from "axios";
import "./ParticularItem.css";

function SavedItems() {
  const id = useParams().id;

  const [items, setItems] = useState([]);
  useEffect(() => {
    const getitemdetails = async () => {
      try {
        const response = await ApiCall("/users/getSaved", "GET", null);
        const temp = response.data.data || {};

        setItems(temp);

        console.log("temp", temp);
        // console.log("itemData", items);
      } catch (error) {
        console.error("Error while fetching saved items: ", error);
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

  const handlePost = async (id) => {
    try {
      const response = await ApiCall(`/users/saveItem/${id}`, "POST", null);
      if (response) {
        console.log("saved item is posted successfully");
      }
      window.location.reload();
    } catch (error) {
      console.error(
        "Error while changing saved items to posted items: ",
        error
      );
    }
  };
  const handleDelete = async (id) => {
    console.log("item to be deleted :", id);
    try {
      const response = await axios.delete(`/users/getItems/${id}`);
      if (response) {
        // console.log("saved item deleted successfully");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting saved items: ", error);
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
      className="saved-wrapper"
      style={{
        // backgroundColor: "gray",
        marginBottom: "12px",
      }}
    >
      <div className="page-mid-section2">
        <h1 style={{ textAlign: "center", paddingTop: "35px" }}>
          <span
            style={{
              borderLeft: "4px solid white",
              borderRight: "4px solid white",
              padding: "10px 40px",
              borderRadius: "50%",
            }}
          >
            Saved Items
          </span>
        </h1>
        {items.map((item, index) => (
          <MDBContainer key={index} fluid>
            <MDBRow className="justify-content-center mb-0">
              <MDBCol md="12" xl="9">
                <MDBCard
                  className=" rounded-3 mt-4 mb-3"
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
                        <h4>{capitalizeFirstLetter(item?.name) || "Name"}</h4>
                        <div className="d-flex flex-row justify-content-between">
                          {/* <div className="text-danger mb-1 me-2">
                         <MDBIcon fas icon="star" />
                         <MDBIcon fas icon="star" />
                         <MDBIcon fas icon="star" />
                         <MDBIcon fas icon="star" />
                       </div> */}
                          <span>
                            Category :{" "}
                            {capitalizeFirstLetter(item?.category) || ""}
                          </span>
                        </div>
                        <div className="d-flex mb-2 flex-row justify-content-between">
                          <span>
                            Quantity :{" "}
                            {capitalizeFirstLetter(item?.quantity) || ""}
                          </span>
                        </div>

                        <p className=" mb-4 mb-md-0">
                          {item?.description ||
                            "There are many variations of passages of Lorem Ipsum"}
                        </p>
                        <div>
                          <h5 className="mb-2 mt-3 me-0">
                            Bidding Available till : {formatDate(item?.expire)}
                          </h5>
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
                            Base Price : &#8377;{item.basePrice || ""}
                          </h4>

                          {/* <span className="text-danger">
                         <s>$20.99</s>
                       </span> */}
                        </div>
                        <div className="mb-2 mt-4 text-muted small">
                          <span>
                            Created On : {formatDate(item.createdAt) || ""}
                          </span>{" "}
                          <br />
                          <span>
                            Last Updated : {formatDate(item.updatedAt) || ""}
                          </span>
                        </div>
                        <h6 className=" mt-4">
                          Status :{" "}
                          <MDBBadge color="warning" pill>
                            {item.state || "Saved"}
                          </MDBBadge>{" "}
                        </h6>
                        <div className="d-flex flex-column mt-2">
                          <Button
                            className="mt-3"
                            style={{
                              // marginTop: "12px",
                              padding: "10px 30px",
                              backgroundColor: "rgb(70, 135, 70)",
                              fontWeight: "600",
                              fontSize: "0.8rem",
                            }}
                            type="submit"
                            onClick={() => {
                              handlePost(item._id);
                            }}
                          >
                            Post
                          </Button>

                          <ItemModal item={item} id={item._id} />
                          <Button
                            className="mt-3"
                            variant="danger"
                            style={{
                              // marginTop: "12px",
                              padding: "10px 30px",
                              fontWeight: "600",
                              fontSize: "0.8rem",
                            }}
                            type="submit"
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        ))}
        {items.length == 0 ? (
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
            <h3>No saved Item</h3>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SavedItems;

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
import "./ItemListing.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiCall from "../../utils/ApiCall";
import Button from "react-bootstrap/esm/Button";

export default function ItemListing() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getitemdetails = async () => {
      try {
        const response = await ApiCall("/users/getPosted", "GET", null);
        const temp = response.data.data || {};

        setItems(temp);

        // console.log("temp", temp);
        // console.log("itemData", items);
      } catch (error) {
        console.error("Error while fetching all posted items: ", error);
      }
    };
    getitemdetails();
  }, []);

  const description =
    "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.";
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
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
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="dashboard-wrapper">
      {items.length == 0 ? (
        <div
          style={{
            marginTop: "21px",
            height: "90.4vh",
            backdropFilter: "blur(4px)",
            display: "flex",
            backgroundColor: "",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "12px",
            color: "white",
          }}
        >
          <h4>There is no listed item available.</h4>
        </div>
      ) : (
        <div className="page-mid-section2 ">
          <div
            style={{
              width: "90%",
              // backgroundColor: "black",
              margin: "20px auto 20px",
              display: "flex",
              paddingTop: "40px",
              height: "fit-content",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {" "}
            {items.map((item, index) => (
              <MDBCard
                key={index}
                className="itemlisting-img"
                style={{
                  backgroundColor: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(4px)",
                  // -webkit-backdrop-filter: blur(4px),
                  border: "4px solid rgb(70, 135, 70)",
                  boxShadow: "4px 4px 40px 6px rgba(70, 135, 70,0.4)",
                  maxHeight: "fit-content",
                  borderRadius: "10px",
                  marginBottom: "40px",
                  minWidth: "75%",
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
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      justifyContent: "center",
                      alignItems: "center",

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
                        <MDBCardTitle style={{ fontWeight: "600" }}>
                          {capitalizeFirstLetter(item.name)}
                        </MDBCardTitle>
                        <MDBCardTitle style={{ fontWeight: "600" }}>
                          {capitalizeFirstLetter(item.category)}
                        </MDBCardTitle>
                      </div>

                      <MDBCardText className="itemlisting-desciption">
                        {truncateText(
                          item.description ||
                            "Details of the product are not provided",
                          80
                        )}
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
                        </span>
                      </MDBCardText>
                      <MDBCardText>
                        <small className="text-muted">
                          <small
                            style={{ fontWeight: "bold", fontSize: "14px" }}
                          >
                            Available to bid till :
                          </small>{" "}
                          &nbsp;
                          {formatDate(item.expire) ||
                            " bid period is not provided"}
                          <br />
                          Status :&nbsp;
                          <MDBBadge color="success" pill>
                            Active
                          </MDBBadge>
                        </small>
                      </MDBCardText>

                      <MDBCardText>
                        <Link to={`/user/item/${item._id}`}>
                          <MDBBtn
                            style={{
                              backgroundColor: "rgb(70, 135, 70)",
                              fontWeight: "600",
                            }}
                          >
                            Know More
                          </MDBBtn>
                        </Link>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

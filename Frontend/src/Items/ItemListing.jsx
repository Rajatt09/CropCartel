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

export default function ItemListing() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getitemdetails = async () => {
      try {
        const response = await ApiCall("/users/getPosted", "GET", null);
        const temp = response.data.data || {};

        setItems(temp);

        console.log("temp", temp);
        console.log("itemData", items);
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
    <div className="page-mid-section2">
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
          <MDBCard
            key={index}
            className="itemlisting-img"
            style={{
              maxHeight: "540px",
              borderRadius: "10px",
              marginBottom: "40px",
            }}
          >
            <MDBRow className="g-0">
              <MDBCol
                md="4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MDBCardImage
                  style={{
                    borderRadius: "10px",
                    width: "80%",
                    maxHeight: "220px",
                  }}
                  src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp"
                  alt="..."
                  fluid
                />
                {/* <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp"
                position="top"
                alt="Gaming Laptop"
              /> */}
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <MDBCardTitle>
                      {capitalizeFirstLetter(item.name)}
                    </MDBCardTitle>
                    <MDBCardTitle>
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
                      <small style={{ fontWeight: "bold", fontSize: "14px" }}>
                        Available to bid till :
                      </small>{" "}
                      &nbsp;
                      {formatDate(item.expire) || " bid period is not provided"}
                      <br />
                      <MDBBadge color="success" pill>
                        Active
                      </MDBBadge>
                    </small>
                  </MDBCardText>

                  <MDBCardText>
                    <Link to={`/user/item/${item._id}`}>
                      <MDBBtn>Know More</MDBBtn>
                    </Link>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        ))}
      </div>
    </div>
  );
}

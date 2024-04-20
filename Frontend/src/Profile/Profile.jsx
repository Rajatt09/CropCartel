import React from "react";
import { IoPersonSharp } from "react-icons/io5";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import ApiCall from "../../utils/ApiCall";
import axios from "axios";
import { useEffect, useState } from "react";
import ProfileModal from "../Modal/ProfileModal";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});

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

        setUserProfile(temp);

        console.log("temp", temp);
        console.log("userData", userProfile);
      } catch (error) {
        console.error("Error while fetching User: ", error);
      }
    };
    getuserdetails();
  }, []);
  async function logout() {
    try {
      const res = await axios.post(`/users/logout`, {});
      //   console.log("data from backend is :", res);
      window.location.href = "/";
      //   if (res.data.success) {
      //     alert("user logged out successful");
      //     // navigate("/");
      //     window.location.href = "/";
      //   } else {
      //     alert("Failed to Log out");
      //     return;
      //   }
    } catch (error) {
      console.log("error occured while logout: ", error);
      window.location.href = "/";
      //   alert("something went wrong while logout");
    }
  }
  return (
    <section style={{ backgroundColor: "#eee", paddingTop: "42px" }}>
      <MDBContainer style={{ paddingTop: "42px" }}>
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: "yellow",
                fontSize: "1.5rem",
              }}
              className="bg-light rounded-3 p-3 mb-4"
            >
              {/* <MDBBreadcrumbItem>
                <a href="#">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem> */}
              <MDBBreadcrumbItem>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                {/* <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                /> */}
                {/* <div>
                  <IoPersonSharp
                    style={{
                      fontSize: "9em",
                      //   backgroundColor: "gray",
                      //   borderRadius: "50%",
                    }}
                  />
                </div> */}
                {userProfile.avatar ? (
                  <MDBCardImage
                    src={userProfile.avatar || ""}
                    alt="avatar"
                    style={{
                      width: "150px",
                      height: "auto",
                      maxWidth: "150px",
                      maxHeight: "150px",
                      borderRadius: "50%",
                    }}
                    fluid
                  />
                ) : (
                  <div>
                    <IoPersonSharp
                      style={{
                        fontSize: "9em",
                        //   backgroundColor: "gray",
                        //   borderRadius: "50%",
                      }}
                    />
                  </div>
                )}
                <p className="text-muted mb-1">
                  {capitalizeFirstLetter(userProfile.name)}
                </p>
                <p className="text-muted mb-4">{userProfile.email}</p>
                <div className="d-flex justify-content-center mb-2">
                  {/* <MDBBtn>Edit Profile Picture</MDBBtn> */}
                  <ProfileModal
                    setUserProfile={setUserProfile}
                    buttonLabel="Update Profile Picture"
                    modalCall="avatar"
                  />
                  {/* <MDBBtn outline className="ms-1">
                    Edit
                  </MDBBtn> */}
                </div>
              </MDBCardBody>
            </MDBCard>
            <div className="d-flex justify-content-center mb-2">
              {/* <MDBBtn>Update Profile Details</MDBBtn> */}
              <ProfileModal
                setUserProfile={setUserProfile}
                buttonLabel="Update Profile Details"
                modalCall="Login"
              />
              {/* <MDBBtn outline className="ms-1">
                    Edit
                  </MDBBtn> */}
            </div>

            <div
              className="d-flex justify-content-center mb-2 profile-show1"
              style={{ marginTop: "18px" }}
            >
              <MDBBtn className="profile-show1" onClick={logout}>
                Logout
              </MDBBtn>
              {/* <MDBBtn outline className="ms-1">
                    Edit
                  </MDBBtn> */}
            </div>

            {/* <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="github fa-lg"
                      style={{ color: "#333333" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="twitter fa-lg"
                      style={{ color: "#55acee" }}
                    />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="instagram fa-lg"
                      style={{ color: "#ac2bac" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="facebook fa-lg"
                      style={{ color: "#3b5998" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard> */}
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-5">
              <MDBCardBody
                style={{ marginTop: "3.6px", marginBottom: "3.6px" }}
              >
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {capitalizeFirstLetter(userProfile.name)}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userProfile.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {`+91 ${userProfile.phnumber}`}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>UPI ID</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userProfile.upiId || "Not Provided"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Aaadhar</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userProfile.aadhar || "Not Provided"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userProfile.city != undefined &&
                      userProfile.state != undefined
                        ? `${userProfile.city}, ${userProfile.state}`
                        : "Not Provided"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Zip Code</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userProfile.zipCode || "Not Provided"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            {/* <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">
                        assigment
                      </span>{" "}
                      Project Status
                    </MDBCardText>
                    <MDBCardText
                      className="mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Web Design
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Website Markup
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      One Page
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Mobile Template
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Backend API
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">
                        assigment
                      </span>{" "}
                      Project Status
                    </MDBCardText>
                    <MDBCardText
                      className="mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Web Design
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Website Markup
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      One Page
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Mobile Template
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Backend API
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow> */}
          </MDBCol>
          <div
            className="d-flex justify-content-center pb-4 mb-2 profile-show2"
            style={{ marginTop: "-8px" }}
          >
            <MDBBtn className="profile-show2" onClick={logout}>
              Logout
            </MDBBtn>
            {/* <MDBBtn outline className="ms-1">
                    Edit
                  </MDBBtn> */}
          </div>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
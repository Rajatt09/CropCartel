import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Login from "../Login/Login";
import React from "react";
import AvatarSection from "../Login/AvatarSection";

function MyVerticallyCenteredModal(props) {
  // console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "rgba(70, 135, 70, 0.85)" }}
      >
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      {props.name === "Login" ? (
        <Login />
      ) : props.name === "avatar" ? (
        <AvatarSection />
      ) : null}

      <Modal.Footer style={{ backgroundColor: "rgba(70, 135, 70,0.85)" }}>
        <Button style={{ backgroundColor: "#b23b3b" }} onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ProfileModal({ buttonLabel, modalCall, style }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        style={style}
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        {buttonLabel}
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        name={modalCall}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ProfileModal;

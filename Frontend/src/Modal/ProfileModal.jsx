import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Login from "../Login/Login";
import React from "react";
import AvatarSection from "../Login/AvatarSection";

function MyVerticallyCenteredModal(props) {
  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      {props.name === "Login" ? (
        <Login />
      ) : props.name === "avatar" ? (
        <AvatarSection />
      ) : null}

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ProfileModal({ buttonLabel, modalCall }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
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
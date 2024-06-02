import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import EditItem from "../Components/EditItem";

function MyVerticallyCenteredModal(props) {
  // console.log("item  modal is : ", props);
  // console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{ backgroundColor: "rgba(46, 90, 136, 0.69)" }}
        closeButton
      >
        {/* <Modal.Title id="contained-modal-title-vcenter">Edit Item</Modal.Title> */}
      </Modal.Header>
      <EditItem item={props.item} id={props.item._id} />

      <Modal.Footer style={{ backgroundColor: "rgba(46, 90, 136, 0.69)" }}>
        <Button style={{ backgroundColor: "#b23b3b" }} onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ItemModal({ item }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        style={{
          boxShadow: "none",
          color: "rgb(70, 135, 70)",
          border: "2px solid rgb(70, 135, 70)",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255,255,255,0.6)",
          padding: "10px 30px",
          fontWeight: "600",
          fontSize: "0.8rem",
        }}
        className="mt-3"
        type="submit"
        onClick={() => setModalShow(true)}
      >
        Edit
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        item={item}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ItemModal;

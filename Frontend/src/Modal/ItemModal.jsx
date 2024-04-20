import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import EditItem from "../Components/EditItem";

function MyVerticallyCenteredModal(props) {
  console.log("item  modal is : ", props);
  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">Edit Item</Modal.Title> */}
      </Modal.Header>
      <EditItem item={props.item} id={props.item._id} />

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
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
          backgroundColor: "white",
          boxShadow: "none",
          color: "#0080FF",
          border: "2px solid #0080FF",
        }}
        className="mt-3 edit-button"
        variant="primary"
        size="sm"
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
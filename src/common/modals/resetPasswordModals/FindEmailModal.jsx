import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import VerifyCodeModal from "./VerifyCodeModal";
import AlertModal from "../AlertModal";
import Spinner from "react-bootstrap/Spinner";

function FindEmailModal({ showFindEmailModal, closeFindEmailModal }) {
  //form states
  const [email, setEmail] = useState("");
  //send user email between modals
  const [sendEmail, setSendEmail] = useState("");
  //show or close next modal
  const [showVerifyCodeModal, setShowVerifyCodeModal] = useState(false); // show modal state
  const closeShowVerifyCodeModal = () => setShowVerifyCodeModal(false); //close modal function
  const handleShowVerifyCodeModal = () => setShowVerifyCodeModal(true); //show modal function
  // Alert states
  const [showAlertModal, setShowAlertModal] = useState(false); //Activate modal alert
  const [bodyText, setBodyText] = useState("");
  //show load modal
  const [loading, setLoading] = useState(false);

  ////Function to send data to the server
  const handleSubmite = async () => {
    setLoading(true); //Activar modal de carga de espera
    try {
      const data = { email: email };
      const response = await axios.post(
        "http://localhost:3080/requestResetPassword/findEmail",
        data
      );
      //check if the response is correct
      if (response.status === 200) {
        handleShowVerifyCodeModal(); // show modal VerifyCodeModal
        closeFindEmailModal(); //close this modal (FindEmailModal)
        setSendEmail(email); //save the user email

      }
    } catch (error) {
      console.error("Error al verificar el email, error: ", error);
      setBodyText(error.response.data.message); //set error alert attributes
      setShowAlertModal(true); // activate alert modal
    } finally {
      setEmail(""); // reset form email input
      setLoading(false); // show load modal
    }
  };

  return (
    <>
      <Modal show={showFindEmailModal} onHide={closeFindEmailModal} centered>
        <Modal.Header closeButton className="border-0  text-center p-5 ">
          <Modal.Title className="fs-6 w-100 text-center ">
            Recuperacion de contraseña
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="mb-3" controlId="findEmail">
              <Form.Label>
                Para restaurar su contraseña ingrese su correo:
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo electronico registrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 d-flex justify-content-center p-5">
          <Button
            variant="light"
            type="button"
            className=" border-black"
            onClick={handleSubmite}
          >
            Buscar
          </Button>
        </Modal.Footer>
      </Modal>
      <VerifyCodeModal
        showVerifyCodeModal={showVerifyCodeModal}
        closeShowVerifyCodeModal={closeShowVerifyCodeModal}
        userEmail={sendEmail}
      />

      <AlertModal
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title="¡Error!"
        titleColor="text-danger"
        icon={""}
        bodyText={bodyText}
        buttonText="Aceptar"
      />
      {/* load notification modal*/}
      <Modal
        className=""
        show={loading}
        centered
        backdrop="static"
        keyboard={false}
        size="sm"
      >

        <Modal.Body className="text-center border rounded  border-light bg-black">
          <div className="text-center p-3">
            <Spinner animation="grow" size="sm" variant="success" />
            <Spinner animation="grow" variant="primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
            <p className="text-light mt-3 ">Loading...</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FindEmailModal;

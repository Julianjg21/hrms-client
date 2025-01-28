import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ChangePasswordModal from "./ChangePasswordModal";
import AlertModal from "../AlertModal";
import { verifyCode } from "../../../services/api/resetPasswords/ResetPassowordApis.mjs";
function VerifyCodeModal({
  showVerifyCodeModal, //show verifyCodeModal
  closeShowVerifyCodeModal, //close verify code modal
  userEmail: email, // user email
}) {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false); //show modal state
  const closeChangePasswordModal = () => setShowChangePasswordModal(false); //close modal ChangePasswordModal
  const handleShowChangePasswordModal = () => setShowChangePasswordModal(true); //show modal  changePasswordState
  const [showAlertModal, setShowAlertModal] = useState(false); //Activate modal alert
  const [code, setCode] = useState(Array(7).fill("")); //Initialize array with 7 empty values.
  const inputRefs = useRef([]); //store references to inputs
  const [bodyText, setBodyText] = useState(""); //alert text

  //Handle change in each input
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; //Avoid non-numeric characters

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    //Move focus to next input if a number has been entered
    if (value && index < 6) {
      inputRefs.current[index + 1].focus();
    }
  };

  //Handle backspace (deletes a number and moves focus to the previous one)
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !code[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  //Handle form submission
  const handleSubmite = async () => {
    const codeEntered = code.join(""); //unite the numbers into a single one
    const data = { email: email, code: codeEntered };
    try {
      //send the code to the server
      const response = await verifyCode(data);
      //check if the response is correct
      if (response.status === 200) {
        handleShowChangePasswordModal(); //show modal changePasswordModal
        closeShowVerifyCodeModal(); //close modal verifyCodeModal
      }
    } catch (error) {
      console.error("Error verifying the code, error: ", error);
      setBodyText(error.response.data.message); //save the response received from the server
      setShowAlertModal(true); // show alert modal
    } finally {
      setCode(Array(7).fill("")); //reset values of the  form inputs
    }
  };

  return (
    <>
      <Modal
        show={showVerifyCodeModal}
        onHide={closeShowVerifyCodeModal}
        centered
      >
        <Modal.Header closeButton className="border-0  text-center p-5 ">
          <Modal.Title className="fs-6 w-100 text-center ">
            Recuperacion de contraseña
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <p className=" ">
            Porfavor ingrese el codigo de recuperacion enviado a{" "}
            <span className=" text-info">{email}</span>{" "}
          </p>
          <Form className="d-flex gap-2 justify-content-center">
            {/* iterate over the 'code' array to render inputs dynamically */}
            {code.map((_, index) => (
              <div
                key={index} //'index' as key to identify each input
                className="d-flex flex-column align-items-center"
              >
                <input
                  type="text"
                  value={code[index]} //Binds the input value to the corresponding element in the 'code' array
                  onChange={(e) => handleChange(e, index)} //Call 'handleChange' when the input value changes
                  onKeyDown={(e) => handleBackspace(e, index)} //Handles the backspace action
                  maxLength="1" //Restrict input to a single character
                  className="form-control form-control-sm text-center border-secondary"
                  style={{
                    width: "80%",
                    height: "100%",
                    fontSize: "20px",
                  }}
                  autoFocus={index === 0} //The first input is automatically focused
                  ref={(el) => (inputRefs.current[index] = el)} //Assigns a reference to each input
                />
              </div>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 d-flex justify-content-center p-5">
          <Button
            variant="light"
            className=" border-black"
            onClick={handleSubmite}
            type="button"
          >
            Intentar
          </Button>
        </Modal.Footer>
      </Modal>
      <ChangePasswordModal
        showChangePasswordModal={showChangePasswordModal}
        closeChangePasswordModal={closeChangePasswordModal}
        userEmail={email}
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
    </>
  );
}

export default VerifyCodeModal;

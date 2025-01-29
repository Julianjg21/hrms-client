import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function ListUsersModal({
  showListUsersModal,
  closeListUsersModal,
  usersFound,
  nextRoute
}) {
  const navigate = useNavigate(); //We use the useNavigate hook

  //Navigate to the next route
  const navigateNextRoute = (item) => {
    navigate(nextRoute, { state: item });
  };
  return (
    <Modal
      show={showListUsersModal}
      onHide={closeListUsersModal}
      centered
      size="sm"
    >
      <Modal.Header className="border border-bottom-0" closeButton>
        <Modal.Title className="fs-6 w-100 text-center">
          ¡Usuario Encontrado!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="border border-bottom-0 border-top-0 ">
        <div className="text-center  mb-4">
          {usersFound.user.map((item, index) => {
            return (
              <Button
                className="w-100 mt-1 text-start rounded-4"
                variant="outline-dark"
                onClick={() => navigateNextRoute(item)}
              >
                {item.user_names} - {item.identification}{" "}
                <span className="text-primary float-end">Ver</span>
              </Button>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ListUsersModal;

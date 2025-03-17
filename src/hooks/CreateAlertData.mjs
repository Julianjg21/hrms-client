import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const createAlertData = (message, status) => {
  const isSuccess = status >= 200 && status < 300; //Success ranks management
  return {
    title: isSuccess ? "¡Éxito!" : "¡Error!", //Title of the alert
    titleColor: isSuccess ? "text-dark" : "text-danger", //color of the alert title
    //Alert icon
    icon: isSuccess ? (
      <FaCheckCircle className="fs-1 text-success" />
    ) : (
      <FaExclamationCircle className="fs-1 text-danger" />
    ),
    bodyText: message || "Ocurrió un error inesperado.", //Message of the alert
    buttonText: "Aceptar", //Text of the alert button
  };
};

export default createAlertData;

import React from "react";
import styles from "./notifications.module.css";
interface NotificationProps {
  status: "pending" | "success" | "error" | "";
  title: string; // Limited to specific string values
  message?: string; // Optional property for error messages
}
const Notification: React.FC<NotificationProps> = (props) => {
  const { status, message } = props;
  let notification;
  let statusClass: string = "";

  if (status === "pending") {
    notification = {
      status: "pending",
      title: "Enviando mensaje...",
      message: "Tu mensaje esta siendo enviado..",
    };
  }

  if (status === "success") {
    notification = {
      status: "success",
      title: "Exito!",
      message: "Mensaje Enviado Exitosamente!",
    };
  }

  if (status === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: message ? message : "Se produjo un error.",
    };
  } else {
    // Fallback for unexpected status (optional)
    notification = {
      status: "unknown",
      title: "Estado desconocido",
      message: "Ocurrió un error inesperado.",
    };
  }

  if (status === "success" && styles.success) {
    statusClass = styles.success;
  } else if (status === "error" && styles.error) {
    statusClass = styles.error;
  } else if (status === "pending" && styles.pending) {
    statusClass = styles.pending;
  }

  return (
    <div className={`${styles.notification} ${statusClass}`}>
      <div>{notification.title}</div>
      <div>{notification.message}</div>
    </div>
  );
};

export default Notification;

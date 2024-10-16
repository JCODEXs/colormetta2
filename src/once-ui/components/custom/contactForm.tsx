"use client";
import React, { useState, useEffect, useRef } from "react";

import styles from "./contactForm.module.css";
import Notification from "../notifications/notifications";

type RequestStatus = "pending" | "success" | "error" | "";
type ContactDetails = {
  email: string;
  name: string;
  message: string;
  phone: string;
};
interface NotificationData {
  status: "pending" | "success" | "error" | "";
  title: string;
  message: string;
}

async function sendContactData(contactDetails: ContactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    // console.log("hi");
    throw new Error(data.message || "Something went wrong!");
  }
}

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredName, setEnteredName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [enteredMessage, setEnteredMessage] = useState<string>("");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(""); // Using RequestStatus type
  const [requestError, setRequestError] = useState<string | null>(null); // Optional error message type
  const ref = useRef(null);
  let notification: NotificationData | null = null;
  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus("");
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event: React.FormEvent) {
    event.preventDefault();
    setRequestStatus("pending");

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
        phone: phone,
      });
      setRequestStatus("success");
      setEnteredMessage("");
      setEnteredEmail("");
      setEnteredName("");
      setPhone("");
    } catch (error: any) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Enviando mensaje...",
      message: "Tu mensaje esta siendo enviado..",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Exito!",
      message: "Mensaje Enviado Exitosamente!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError || "Se produjo un error.",
    };
  }

  return (
    <div
      style={{
        // display: "flex",
        // flexDirection: "row",
        // flexWrap: "wrap",
        height: "100%",
        width: "100%",
        marginBottom: "0.3rem",
        // minHeight: "40vh",
        // alignContent: "center",
        // justifyContent: "center",
      }}
    >
      <section className={styles.contact}>
        <div className={styles.callToaction}>
          <p>
            Give us your contact information, and we will get in touch with you
            to discuss your ideas and provide you with a personalized quote.
          </p>
        </div>
        <form ref={ref} className={styles.form} onSubmit={sendMessageHandler}>
          <div className={styles.controls}>
            <div className={styles.control}>
              <label htmlFor="email"> Email</label>
              <input
                style={{ border: " 1px solid #0D0D0D" }}
                type="email"
                id="email"
                required
                value={enteredEmail}
                onChange={(event) => setEnteredEmail(event.target.value)}
              />
            </div>
            <div className={styles.control}>
              <label htmlFor="name">Name</label>
              <input
                style={{ border: "1px solid #0D0D0D" }}
                type="text"
                id="name"
                required
                value={enteredName}
                onChange={(event) => setEnteredName(event.target.value)}
              />
            </div>
            <div className={styles.control}>
              <label htmlFor="phone">Phone</label>
              <input
                style={{ border: "1px solid #0D0D0D" }}
                type="number"
                id="phone"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
          </div>
          <div className={styles.control}>
            <label htmlFor="message">Messaje</label>
            <textarea
              style={{ border: "1px solid #0D0D0D" }}
              id="message"
              rows={5}
              required
              value={enteredMessage}
              onChange={(event) => setEnteredMessage(event.target.value)}
            ></textarea>
          </div>

          <button className={styles.button}>Send📨</button>
        </form>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
        {/* <pre>{JSON.stringify(notification,null,2)}</pre> */}
      </section>
      {/* {showImage && (
        <div className={styles.image}>
          <Image
            src="/images/site/edgar.jpg"
            alt="Pensiones Colombianos"
            width={300}
            height={300}
          />
        </div>
      )} */}
    </div>
  );
}

export default ContactForm;

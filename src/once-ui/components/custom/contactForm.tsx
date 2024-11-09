"use client";
import React, { useState, useEffect, useRef } from "react";

import styles from "./contactForm.module.css";
import Notification from "../notifications/notifications";
import Image from "next/image";
import { Button } from "@/once-ui/components";

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

async function sendContactData(contactDetails: ContactDetails): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: { message?: string } = await response.json();
  console.log(data);

  if (!response.ok) {
    // console.log("hi");
    throw new Error(data?.message ?? "Something went wrong!");
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setRequestError(error.message);
      } else {
        setRequestError("An unknown error occurred");
      }
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
      message: requestError ?? "Se produjo un error.",
    };
  }

  return (
    <section className={styles.contact}>
      <div className={styles.callToaction}>
        <p>
          Share your contact details, and we’ll reach out to discuss your ideas
          and offer a personalized quote. You can also message us directly on
          WhatsApp! or join our Discord.
        </p>
      </div>
      <form ref={ref} className={styles.form} onSubmit={sendMessageHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email"> Email</label>
            <input
              style={{
                border: " 1px solid #F066F2",
                padding: "0.25rem",
                color: "#F213CD",
                background: "#4F0359",
              }}
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
              style={{
                border: "1px solid #F066F2",
                padding: "0.25rem",
                color: "#F213CD",
                background: "#4F0359",
              }}
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
              style={{
                border: "1px solid #F066F2",
                padding: "0.25rem",
                color: "#F213CD",
                background: "#4F0359",
              }}
              type="text"
              id="phone"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Message</label>
          <textarea
            style={{
              border: "1px solid #F066F2",
              padding: "0.25rem",
              color: "#F213CD",
              background: "#4F0359",
            }}
            id="message"
            rows={5}
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className={styles.button}>Send 📨</button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "space-around",
          }}
        >
          <a
            style={{
              zIndex: 100,
              marginBottom: "1rem",
            }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            href="https://wa.me/573002536997"
          >
            {" "}
            <Image
              alt="Chat on WhatsApp"
              src="/linechat .png"
              width={58}
              height={58}
            />{" "}
          </a>
          {/* <a
            style={{
              zIndex: 100,
              marginBottom: "1rem",
            }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="call us"
            href="tel:17074974415"
          >
            {" "}
            <Image
              alt="call us"
              src="/phone.png"
              width={55}
              height={55}
              style={{
                borderRadius: "50%",
              }}
            />{" "}
          </a> */}

          <Button
            href="https://discord.gg/945vGxQV"
            prefixIcon="discord"
            size="l"
            variant="danger"
          >
            Discord
          </Button>
        </div>
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
  );
}

export default ContactForm;

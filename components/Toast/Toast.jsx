// components/Toast.js
import { useState, useEffect } from "react";
import styles from "./Toast.css";

export default function Toast({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={`${styles.toast} ${visible ? styles.show : ""}`}>
      {message}
    </div>
  );
}

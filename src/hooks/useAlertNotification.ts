import { useState, useEffect } from "react";

export const useAlertNotification = (timeout = 3000) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  useEffect(() => {
    let timer: number;
    if (showAlert) {
      timer = window.setTimeout(() => {
        setShowAlert(false);
      }, timeout);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showAlert, timeout]);

  const showNotification = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "success"
  ) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const hideNotification = () => {
    setShowAlert(false);
  };

  return {
    showAlert,
    alertMessage,
    alertType,
    showNotification,
    hideNotification,
  };
};

export default useAlertNotification;

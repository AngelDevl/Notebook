import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { Alert } from "react-bootstrap";
import "../../css/alert.css"

type AlertVariant = "success" | "warning" | "danger";

interface AlertData {
  message: string;
  variant: AlertVariant;
  duration?: number;
}

interface AlertContext {
  triggerAlert: (
    message: string,
    variant?: AlertVariant,
    time?: number,
  ) => void;
}

const AlertContext = createContext<AlertContext | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useAlert must be used within an AlertProvider");
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [visible, setVisible] = useState(false);

  const triggerAlert = (
    message: string,
    variant: AlertVariant = "success",
    duration: number = 10000,
  ) => {
    setAlert({ message, variant, duration });
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ triggerAlert }}>
      {children}
      {alert && (
        <Alert
          show={visible}
          variant={alert.variant}
          className="alert-card"
        >
          {alert.message}
        </Alert>
      )}
    </AlertContext.Provider>
  );
};

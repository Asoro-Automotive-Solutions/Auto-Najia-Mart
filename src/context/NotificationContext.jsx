import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState({
    chat: true,
    order: true,
  });

  const location = useLocation();

  // Clear notification automatically when navigating to the respective route
  useEffect(() => {
    if (location.pathname.startsWith("/orders") || location.pathname.startsWith("/order-history")) {
      setNotifications((prev) => (prev.order ? { ...prev, order: false } : prev));
    } else if (location.pathname.startsWith("/chat")) {
      setNotifications((prev) => (prev.chat ? { ...prev, chat: false } : prev));
    }
  }, [location.pathname]);

  const clearNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const setNotification = (key, value = true) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        clearNotification,
        setNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    return {
      notifications: { chat: false, order: false },
      clearNotification: () => {},
      setNotification: () => {},
    };
  }
  return context;
}

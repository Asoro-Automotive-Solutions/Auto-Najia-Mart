import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import OrderHistoryPage from "./pages/orders/OrderHistoryPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotificationSettingsPage from "./pages/settings/NotificationSettingsPage";
import { NotificationProvider } from "./context/NotificationContext";

function OrderHistoryRoute() {
  const navigate = useNavigate();
  return (
    <OrderHistoryPage
      onBack={() => navigate(-1)}
      onNavigate={(key) => {
        if (key === "order" || key === "home") navigate("/orders");
        else if (key === "profile") navigate("/profile");
        else if (key === "notifications") navigate("/notifications");
      }}
      onOrderClick={(order) => {
        console.log("Order selected:", order);
      }}
    />
  );
}

function ProfileRoute() {
  const navigate = useNavigate();
  return (
    <ProfilePage
      onNavigate={(key) => {
        if (key === "order" || key === "home") navigate("/orders");
        else if (key === "profile") navigate("/profile");
        else if (key === "notifications") navigate("/notifications");
      }}
      onLogOut={() => {
        alert("Logged out");
      }}
    />
  );
}

function NotificationSettingsRoute() {
  const navigate = useNavigate();
  return (
    <NotificationSettingsPage
      onNavigate={(key) => {
        if (key === "order" || key === "home") navigate("/orders");
        else if (key === "profile") navigate("/profile");
        else if (key === "notifications") navigate("/notifications");
      }}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          {/* Only the 3 screens authored by you */}
          <Route path="/" element={<OrderHistoryRoute />} />
          <Route path="/orders" element={<OrderHistoryRoute />} />
          <Route path="/order-history" element={<OrderHistoryRoute />} />
          <Route path="/profile" element={<ProfileRoute />} />
          <Route path="/notifications" element={<NotificationSettingsRoute />} />
          <Route path="/settings/notifications" element={<NotificationSettingsRoute />} />
          
          {/* Catch-all route defaults to Order History */}
          <Route path="*" element={<OrderHistoryRoute />} />
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  );
}
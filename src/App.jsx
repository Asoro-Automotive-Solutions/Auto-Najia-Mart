import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams } from "react-router-dom";

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
        else if (key === "security") navigate("/profile?tab=security");
      }}
      onOrderClick={(order) => {
        console.log("Order selected:", order);
      }}
    />
  );
}

function ProfileRoute() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "personal_info";

  return (
    <ProfilePage
      initialTab={currentTab}
      onNavigate={(key) => {
        if (key === "order" || key === "home") navigate("/orders");
        else if (key === "profile") navigate("/profile");
        else if (key === "notifications") navigate("/notifications");
        else if (key === "security") navigate("/profile?tab=security");
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
        else if (key === "security") navigate("/profile?tab=security");
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
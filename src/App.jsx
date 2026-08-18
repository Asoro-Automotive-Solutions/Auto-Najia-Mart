import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import OnboardingPage from "./pages/onboarding/OnboardingPage";
import VerificationCodePage from "./pages/onboarding/VerificationCodePage";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import VerifyPage from "./pages/auth/VerifyPage";
import ResetPage from "./pages/auth/ResetPage";
import PasswordResetSuccessPage from "./pages/auth/PasswordResetSuccessPage";

import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

import ChatPage from "./pages/chats/Chatpage";
import OrderHistoryPage from "./pages/orders/OrderHistoryPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotificationSettingsPage from "./pages/settings/NotificationSettingsPage";

// Each *Route component below is the "parent" for its page — it owns
// navigation (via useNavigate) and hands the right callback props down
// to the presentational page component. The page components themselves
// stay untouched and reusable.

function OnboardingRoute() {
  const navigate = useNavigate();
  return (
    <OnboardingPage
      onGetStarted={() => navigate("/register")}
      onLogin={() => navigate("/login")}
    />
  );
}

function VerificationCodeRoute() {
  const navigate = useNavigate();
  return (
    <VerificationCodePage
      onBack={() => navigate("/onboarding")}
      onResend={() => console.log("resend onboarding code")}
      onSubmit={(code) => {
        console.log("verify onboarding code", code);
        navigate("/chat");
      }}
    />
  );
}

function LoginRoute() {
  const navigate = useNavigate();
  return (
    <LoginPage
      onBack={() => navigate("/onboarding")}
      onForgotPassword={() => navigate("/reset-password")}
      onSignUp={() => navigate("/register")}
      onGoogleLogin={() => console.log("google login")}
      onFacebookLogin={() => console.log("facebook login")}
      onSubmit={(data) => {
        console.log("login submit", data);
        navigate("/chat");
      }}
    />
  );
}

function RegisterRoute() {
  const navigate = useNavigate();
  return (
    <RegisterPage
      onBack={() => navigate("/onboarding")}
      onSignIn={() => navigate("/login")}
      onGoogleSignUp={() => console.log("google sign up")}
      onFacebookSignUp={() => console.log("facebook sign up")}
      onSubmit={(data) => {
        console.log("register submit", data);
        navigate("/verify-code");
      }}
    />
  );
}

// "Forgot password" — enter email, request a reset code
function ResetPasswordRoute() {
  const navigate = useNavigate();
  return (
    <ResetPasswordPage
      onBackToLogin={() => navigate("/login")}
      onSubmit={(data) => {
        console.log("send reset code to", data.email);
        navigate("/verify");
      }}
    />
  );
}

// "Check your email" — enter the 5-digit reset code
function VerifyRoute() {
  const navigate = useNavigate();
  return (
    <VerifyPage
      onResend={() => console.log("resend reset code")}
      onBackToLogin={() => navigate("/login")}
      onSubmit={(code) => {
        console.log("verify reset code", code);
        navigate("/reset");
      }}
    />
  );
}

// Set a new password
function ResetRoute() {
  const navigate = useNavigate();
  return (
    <ResetPage
      onSubmit={(data) => {
        console.log("set new password", data);
        navigate("/reset-success");
      }}
    />
  );
}

function PasswordResetSuccessRoute() {
  const navigate = useNavigate();
  return (
    <PasswordResetSuccessPage onBackToLogin={() => navigate("/login")} />
  );
}

function ChatRoute() {
  const navigate = useNavigate();
  return (
    <ChatPage
      onNavigate={(key) => {
        if (key === "order") navigate("/orders");
        else if (key === "chat") navigate("/chat");
        else if (key === "home") navigate("/");
        else console.log("navbar navigate:", key);
      }}
      onPayEscrow={() => {
        console.log("pay via escrow");
        navigate("/orders");
      }}
      onSendMessage={(text) => console.log("send message", text)}
    />
  );
}

function OrderHistoryRoute() {
  const navigate = useNavigate();
  return (
    <OrderHistoryPage
      onBack={() => navigate(-1)}
      onNavigate={(key) => {
        if (key === "chat") navigate("/chat");
        else if (key === "order") navigate("/orders");
        else if (key === "home") navigate("/");
        else if (key === "search") navigate("/search");
        else if (key === "profile") navigate("/profile");
        else console.log("bottom nav navigate:", key);
      }}
      onOrderClick={(order) => {
        console.log("Order clicked:", order);
      }}
    />
  );
}

function SearchRoute() {
  const navigate = useNavigate();
  const handleNav = (key) => {
    if (key === "order") navigate("/orders");
    else if (key === "chat") navigate("/chat");
    else if (key === "profile") navigate("/profile");
    else if (key === "search") navigate("/search");
    else navigate("/");
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar activeKey="search" onNavigate={handleNav} />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">Search Auto Parts & Vehicles</h2>
        <p className="text-sm text-slate-500 mt-2">Search catalogue coming soon.</p>
      </div>
      <BottomNav activeKey="search" onNavigate={handleNav} />
    </div>
  );
}

function ProfileRoute() {
  const navigate = useNavigate();
  const handleNav = (key) => {
    if (key === "order") navigate("/orders");
    else if (key === "chat") navigate("/chat");
    else if (key === "profile") navigate("/profile");
    else if (key === "search") navigate("/search");
    else if (key === "notifications") navigate("/notifications");
    else navigate("/");
  };
  return (
    <ProfilePage
      onNavigate={handleNav}
      onLogOut={() => navigate("/login")}
    />
  );
}

function NotificationSettingsRoute() {
  const navigate = useNavigate();
  const handleNav = (key) => {
    if (key === "order") navigate("/orders");
    else if (key === "chat") navigate("/chat");
    else if (key === "profile") navigate("/profile");
    else if (key === "search") navigate("/search");
    else navigate("/");
  };
  return (
    <NotificationSettingsPage
      onNavigate={handleNav}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnboardingRoute />} />
        <Route path="/onboarding" element={<OnboardingRoute />} />
        <Route path="/verify-code" element={<VerificationCodeRoute />} />

        <Route path="/login" element={<LoginRoute />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route path="/reset-password" element={<ResetPasswordRoute />} />
        <Route path="/verify" element={<VerifyRoute />} />
        <Route path="/reset" element={<ResetRoute />} />
        <Route
          path="/reset-success"
          element={<PasswordResetSuccessRoute />}
        />

        <Route path="/chat" element={<ChatRoute />} />
        <Route path="/orders" element={<OrderHistoryRoute />} />
        <Route path="/order-history" element={<OrderHistoryRoute />} />
        <Route path="/search" element={<SearchRoute />} />
        <Route path="/profile" element={<ProfileRoute />} />
        <Route path="/notifications" element={<NotificationSettingsRoute />} />
        <Route path="/settings/notifications" element={<NotificationSettingsRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
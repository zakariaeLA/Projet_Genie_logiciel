import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/loginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage"; // Import ChatPage
import CalendrierPage from "./pages/CalendrierPage"; // Import CalendrierPage
import ClubsPage from "./pages/ClubsPage"; // Import ClubsPage
import EvenementPage from "./pages/EvenementPage"; // Import EvenementPage
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  
  // State to control the visibility of the login modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  // Close login modal and redirect to home
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    navigate("/"); // Redirect to home page
  };

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        {/* Unprotected Route */}
        <Route path="/" element={<HomePage />} />

        {/* Protected Routes */}
        <Route path="/calendar" element={authUser ? <CalendrierPage /> : <Navigate to="/login" />} />
        <Route path="/clubs" element={authUser ? <ClubsPage /> : <Navigate to="/login" />} />
        <Route path="/events" element={authUser ? <EvenementPage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        
        {/* Signup Route */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        
        {/* Login Route */}
        <Route
          path="/login"
          element={!authUser && !isLoginModalOpen ? (
            <LoginPage onClose={handleCloseLoginModal} />
          ) : (
            <Navigate to="/" />
          )}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has seen splash screen before
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");
    
    if (!hasSeenSplash) {
      navigate("/splash");
    }
  }, [navigate]);

  // This is now the main Home component, redirected from App.tsx
  return null;
};

export default Index;

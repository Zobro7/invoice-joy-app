import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, User, Share2 } from "lucide-react";
import heroImage from "@/assets/hero-invoice.jpg";
import quickStartIcons from "@/assets/quick-start-icons.jpg";

const Splash = () => {
  const navigate = useNavigate();
  const [showQuickStart, setShowQuickStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowQuickStart(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    console.log("Get Started button clicked");
    localStorage.setItem("hasSeenSplash", "true");
    console.log("Navigating to /home");
    navigate("/home");
  };

  const quickStartSteps = [
    {
      icon: ShoppingCart,
      title: "Add Products",
      description: "Build your inventory"
    },
    {
      icon: User,
      title: "Add Customer", 
      description: "Manage your clients"
    },
    {
      icon: Share2,
      title: "Share & Get Paid",
      description: "Send and track invoices"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
      
      {/* Hero Section */}
      <div className="text-center space-y-8 animate-float-up max-w-md mx-auto">
        {/* Logo/Hero Image */}
        <div className="relative">
          <img 
            src={heroImage} 
            alt="Lovable Invoice Hero" 
            className="w-80 h-44 object-cover rounded-2xl shadow-floating mx-auto"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
        </div>

        {/* Main Headlines */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Create invoices
            <span className="block text-primary">instantly</span>
          </h1>
          <p className="text-xl text-primary font-semibold">Free Forever</p>
        </div>

        {/* Quick Start Guide */}
        {showQuickStart && (
          <div className="space-y-6 animate-bounce-in">
            <h2 className="text-lg font-semibold text-muted-foreground">Quick Start Guide</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {quickStartSteps.map((step, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-card rounded-xl shadow-card hover:shadow-floating transition-all duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Button 
          onClick={handleGetStarted}
          variant="floating"
          size="xl"
          className="w-full animate-glow-pulse"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </Button>

        {/* Trust Indicator */}
        <p className="text-sm text-muted-foreground">
          Join thousands of freelancers and small businesses
        </p>
      </div>
    </div>
  );
};

export default Splash;
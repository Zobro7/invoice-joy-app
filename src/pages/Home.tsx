import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ShoppingCart, User, Calculator, Wifi, Check } from "lucide-react";
import { CalculatorKeypad } from "@/components/CalculatorKeypad";
import { QuickActions } from "@/components/QuickActions";
import { InvoiceCounter } from "@/components/InvoiceCounter";

const Home = () => {
  const [currentAmount, setCurrentAmount] = useState("0");
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isOnline] = useState(true);

  const handleKeypadInput = (value: string) => {
    if (value === "clear") {
      setCurrentAmount("0");
    } else if (value === "backspace") {
      setCurrentAmount(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
    } else if (value === ".") {
      if (!currentAmount.includes(".")) {
        setCurrentAmount(prev => prev + ".");
      }
    } else {
      setCurrentAmount(prev => {
        if (prev === "0") return value;
        return prev + value;
      });
    }
  };

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return "₹0.00";
    return `₹${num.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Lovable Invoice</h1>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                {isOnline ? (
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                ) : (
                  <Wifi className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-xs text-muted-foreground">
                  {isOnline ? "Synced" : "Offline"}
                </span>
              </div>
            </div>
          </div>
          <InvoiceCounter count={12} />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Amount Display */}
        <Card className="p-6 bg-gradient-card shadow-floating">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Invoice Amount</p>
            <div className="text-4xl font-bold text-primary">
              {formatAmount(currentAmount)}
            </div>
            <p className="text-xs text-muted-foreground">Tap numbers or use quick actions</p>
          </div>
        </Card>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="h-16 flex-col space-y-2"
          >
            <Plus className="w-6 h-6" />
            <span className="text-sm">Add Product</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 flex-col space-y-2"
          >
            <User className="w-6 h-6" />
            <span className="text-sm">Select Customer</span>
          </Button>
        </div>

        {/* Calculator Keypad */}
        <CalculatorKeypad onInput={handleKeypadInput} />

        {/* Create Invoice Button */}
        <Button 
          variant="floating"
          size="xl"
          className="w-full"
          disabled={currentAmount === "0"}
        >
          <Calculator className="w-5 h-5" />
          Create Invoice
        </Button>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">Recent Activity</h3>
          <Card className="p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Invoice #001</p>
                <p className="text-sm text-muted-foreground">John Doe • ₹1,250.00</p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <Check className="w-3 h-3 mr-1" />
                Paid
              </Badge>
            </div>
          </Card>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <Button
          variant="floating"
          size="icon"
          className="w-14 h-14 rounded-full shadow-floating hover:shadow-glow"
          onClick={() => setShowQuickActions(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Quick Actions Modal */}
      <QuickActions 
        open={showQuickActions} 
        onClose={() => setShowQuickActions(false)} 
      />
    </div>
  );
};

export default Home;
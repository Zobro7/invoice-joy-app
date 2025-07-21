import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CalculatorKeypad } from "@/components/CalculatorKeypad";
import { InvoiceGenerator } from "@/components/InvoiceGenerator";
import { InvoiceCounter } from "@/components/InvoiceCounter";
import { Calculator, FileText, Percent } from "lucide-react";

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
}

export const Home = () => {
  const [invoiceText, setInvoiceText] = useState("");
  const [calculatorDisplay, setCalculatorDisplay] = useState("0");
  const [calculatorMode, setCalculatorMode] = useState(false);
  const [gstRate, setGstRate] = useState("18");
  const [showInvoiceGenerator, setShowInvoiceGenerator] = useState(false);
  const [parsedInvoice, setParsedInvoice] = useState<{
    products: Product[];
    subtotal: number;
    gst: number;
    total: number;
  } | null>(null);
  const [invoiceCount, setInvoiceCount] = useState(42);

  const exampleText = `Snickers 5 100
Coca Cola 3 50
Chips 2 75`;

  const handleKeypadInput = (value: string) => {
    if (value === "clear") {
      setCalculatorDisplay("0");
    } else if (value === "backspace") {
      setCalculatorDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
    } else if (value === "=") {
      try {
        const result = eval(calculatorDisplay.replace(/×/g, '*').replace(/÷/g, '/'));
        setCalculatorDisplay(result.toString());
      } catch {
        setCalculatorDisplay("Error");
      }
    } else if (["+", "-", "×", "÷"].includes(value)) {
      setCalculatorDisplay(prev => prev + " " + value + " ");
    } else {
      setCalculatorDisplay(prev => {
        if (prev === "0" && value !== ".") {
          return value;
        }
        return prev + value;
      });
    }
  };

  const parseInvoiceText = (text: string) => {
    const lines = text.trim().split('\n').filter(line => line.trim());
    const products: Product[] = [];
    
    lines.forEach((line, index) => {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 3) {
        const quantity = parseInt(parts[parts.length - 2]);
        const price = parseFloat(parts[parts.length - 1]);
        const name = parts.slice(0, -2).join(' ');
        
        if (!isNaN(quantity) && !isNaN(price) && name) {
          products.push({
            id: `product-${index}`,
            name,
            quantity,
            price
          });
        }
      }
    });

    const subtotal = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
    const gstAmount = (subtotal * parseFloat(gstRate)) / 100;
    const total = subtotal + gstAmount;

    return {
      products,
      subtotal,
      gst: gstAmount,
      total
    };
  };

  const handleSubmitInvoice = () => {
    if (!invoiceText.trim()) return;
    
    const parsed = parseInvoiceText(invoiceText);
    setParsedInvoice(parsed);
    setShowInvoiceGenerator(true);
  };

  const handleInvoiceGenerated = () => {
    setInvoiceText("");
    setParsedInvoice(null);
    setShowInvoiceGenerator(false);
    setInvoiceCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Invoice</h1>
          <p className="text-sm text-muted-foreground">Enter items in simple format</p>
        </div>
        <InvoiceCounter count={invoiceCount} />
      </div>

      {/* Onboarding Example */}
      <Card className="mb-6 border-primary/20 bg-primary/5 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary" />
            How it works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Format: Item Quantity Price</p>
            <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm">
              <div>Snickers 5 100</div>
              <div>Coca Cola 3 50</div>
              <div>Chips 2 75</div>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Calculation:</span>
            <span>(5×100) + (3×50) + (2×75) = ₹800</span>
          </div>
          <div className="flex justify-between items-center text-sm border-t pt-2">
            <span>+ GST ({gstRate}%):</span>
            <span>₹{((800 * parseFloat(gstRate)) / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center font-semibold">
            <span>Total:</span>
            <span className="text-primary">₹{(800 + (800 * parseFloat(gstRate)) / 100).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Input */}
      <Card className="mb-6 border-accent/20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Enter Invoice Items</CardTitle>
            <div className="flex items-center space-x-2">
              <Percent className="w-4 h-4 text-muted-foreground" />
              <Select value={gstRate} onValueChange={setGstRate}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0%</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="12">12%</SelectItem>
                  <SelectItem value="18">18%</SelectItem>
                  <SelectItem value="28">28%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter items like: Snickers 5 100"
            value={invoiceText}
            onChange={(e) => setInvoiceText(e.target.value)}
            className="min-h-[120px] font-mono"
          />
          <Button 
            onClick={handleSubmitInvoice}
            className="w-full"
            disabled={!invoiceText.trim()}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Invoice
          </Button>
        </CardContent>
      </Card>

      {/* Calculator Toggle */}
      <div className="flex items-center justify-center mb-4">
        <Button
          variant="outline"
          onClick={() => setCalculatorMode(!calculatorMode)}
          className="w-full"
        >
          <Calculator className="w-4 h-4 mr-2" />
          {calculatorMode ? "Hide Calculator" : "Show Calculator"}
        </Button>
      </div>

      {/* Calculator */}
      {calculatorMode && (
        <Card className="mb-6 border-accent/20 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="text-right text-2xl font-mono font-semibold">
                {calculatorDisplay}
              </div>
            </div>
            <CalculatorKeypad onInput={handleKeypadInput} />
          </CardContent>
        </Card>
      )}

      {/* Invoice Generator Modal */}
      {parsedInvoice && (
        <InvoiceGenerator
          open={showInvoiceGenerator}
          onClose={() => setShowInvoiceGenerator(false)}
          invoiceData={{
            products: parsedInvoice.products,
            customer: null,
            amount: parsedInvoice.total,
            subtotal: parsedInvoice.subtotal,
            gst: parsedInvoice.gst,
            gstRate: parseFloat(gstRate)
          }}
          onGenerate={handleInvoiceGenerated}
        />
      )}
    </div>
  );
};

export default Home;
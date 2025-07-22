import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calculator, 
  FileText, 
  Plus,
  Trash2,
  Receipt
} from "lucide-react";
import { CalculatorKeypad } from "@/components/CalculatorKeypad";
import { InvoiceGenerator } from "@/components/InvoiceGenerator";

interface TableRow {
  item: string;
  quantity: string;
  price: string;
  gst: string;
}

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  gstRate?: number;
}

export const Home = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorDisplay, setCalculatorDisplay] = useState("0");
  const [showInvoice, setShowInvoice] = useState(false);
  const [fixedGstRate, setFixedGstRate] = useState(18);
  const [isVaryingGst, setIsVaryingGst] = useState(false);
  const [tableRows, setTableRows] = useState<TableRow[]>([
    { item: "", quantity: "", price: "", gst: "" },
    { item: "", quantity: "", price: "", gst: "" },
    { item: "", quantity: "", price: "", gst: "" }
  ]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const addRow = () => {
    setTableRows([...tableRows, { item: "", quantity: "", price: "", gst: "" }]);
  };

  const validateField = (field: keyof TableRow, value: string): boolean => {
    switch (field) {
      case 'item':
        return value.trim().length > 0;
      case 'quantity':
        return !isNaN(parseFloat(value)) && parseFloat(value) > 0;
      case 'price':
        return !isNaN(parseFloat(value)) && parseFloat(value) >= 0;
      case 'gst':
        return !isNaN(parseFloat(value)) && parseFloat(value) >= 0 && parseFloat(value) <= 100;
      default:
        return true;
    }
  };

  const updateRow = (index: number, field: keyof TableRow, value: string) => {
    const newRows = [...tableRows];
    newRows[index][field] = value;
    setTableRows(newRows);
  };

  const handleKeyDown = (e: React.KeyboardEvent, rowIndex: number, colIndex: number) => {
    if (e.key === ' ') {
      e.preventDefault();
      const nextColIndex = colIndex + 1;
      const maxCols = isVaryingGst ? 3 : 2;
      
      if (nextColIndex <= maxCols) {
        const nextInputIndex = rowIndex * (isVaryingGst ? 3 : 2) + nextColIndex;
        inputRefs.current[nextInputIndex]?.focus();
      } else if (rowIndex < tableRows.length - 1) {
        const nextRowFirstInput = (rowIndex + 1) * (isVaryingGst ? 3 : 2);
        inputRefs.current[nextRowFirstInput]?.focus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (rowIndex === tableRows.length - 1) {
        addRow();
        setTimeout(() => {
          const newRowFirstInput = tableRows.length * (isVaryingGst ? 3 : 2);
          inputRefs.current[newRowFirstInput]?.focus();
        }, 0);
      } else {
        const nextRowFirstInput = (rowIndex + 1) * (isVaryingGst ? 3 : 2);
        inputRefs.current[nextRowFirstInput]?.focus();
      }
    }
  };

  const getInputIndex = (rowIndex: number, colIndex: number) => {
    const maxCols = isVaryingGst ? 3 : 2;
    return rowIndex * maxCols + colIndex;
  };

  const calculateTotals = () => {
    let subtotal = 0;
    let totalGst = 0;

    const products = tableRows
      .filter(row => row.item.trim() && row.quantity.trim() && row.price.trim())
      .map(row => {
        const quantity = parseFloat(row.quantity) || 0;
        const price = parseFloat(row.price) || 0;
        const itemSubtotal = quantity * price;
        
        const gstRate = isVaryingGst ? (parseFloat(row.gst) || 0) : fixedGstRate;
        const itemGst = (itemSubtotal * gstRate) / 100;
        
        subtotal += itemSubtotal;
        totalGst += itemGst;

        return {
          id: Math.random().toString(),
          name: row.item,
          price: price,
          quantity: quantity,
          gstRate: gstRate
        };
      });

    return {
      products,
      subtotal,
      gst: totalGst,
      total: subtotal + totalGst
    };
  };

  const totals = calculateTotals();

  const handleCalculatorAction = (action: string) => {
    if (action === "clear") {
      setCalculatorDisplay("0");
    } else if (action === "backspace") {
      setCalculatorDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
    } else if (action === "=") {
      try {
        const result = eval(calculatorDisplay.replace(/×/g, '*').replace(/÷/g, '/'));
        setCalculatorDisplay(result.toString());
      } catch {
        setCalculatorDisplay("Error");
      }
    } else if (["+", "-", "×", "÷"].includes(action)) {
      if (calculatorDisplay !== "0" && !calculatorDisplay.endsWith(" ")) {
        setCalculatorDisplay(calculatorDisplay + " " + action + " ");
      }
    } else {
      if (calculatorDisplay === "0" || calculatorDisplay === "Error") {
        setCalculatorDisplay(action);
      } else {
        setCalculatorDisplay(calculatorDisplay + action);
      }
    }
  };

  const generateInvoice = () => {
    if (totals.products.length === 0) return;
    setShowInvoice(true);
  };

  const handleInvoiceGenerate = () => {
    console.log("Invoice generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Quick Invoice
          </h1>
          <p className="text-muted-foreground">Enter items to create professional invoices</p>
        </div>

        {/* GST Settings */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Receipt className="w-5 h-5 text-primary" />
              <span>GST Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="varying-gst">Varying GST Rates</Label>
                <p className="text-sm text-muted-foreground">
                  {isVaryingGst ? "Set GST rate for each item" : "Use fixed GST rate for all items"}
                </p>
              </div>
              <Switch
                id="varying-gst"
                checked={isVaryingGst}
                onCheckedChange={setIsVaryingGst}
              />
            </div>

            {!isVaryingGst && (
              <div className="space-y-2">
                <Label>Fixed GST Rate</Label>
                <Select value={fixedGstRate.toString()} onValueChange={(value) => setFixedGstRate(parseInt(value))}>
                  <SelectTrigger className="w-32">
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
            )}
          </CardContent>
        </Card>

        {/* Invoice Table */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>Invoice Items</span>
              </div>
              <Button onClick={addRow} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
                Add Row
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Table Headers */}
              <div className={`grid gap-4 font-medium text-sm text-muted-foreground ${
                isVaryingGst ? 'grid-cols-4' : 'grid-cols-3'
              }`}>
                <span className="col-span-2">Item</span>
                <span>Qty</span>
                <span>Price (₹)</span>
                {isVaryingGst && <span>GST (%)</span>}
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {tableRows.map((row, rowIndex) => (
                  <div key={rowIndex} className={`grid gap-4 items-center ${
                    isVaryingGst ? 'grid-cols-4' : 'grid-cols-3'
                  }`}>
                    <Input
                      ref={(el) => inputRefs.current[getInputIndex(rowIndex, 0)] = el}
                      placeholder="Enter item name"
                      value={row.item}
                      onChange={(e) => updateRow(rowIndex, 'item', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 0)}
                      className={`col-span-2 ${!validateField('item', row.item) && row.item.length > 0 ? 'border-destructive' : ''}`}
                    />
                    <Input
                      ref={(el) => inputRefs.current[getInputIndex(rowIndex, 1)] = el}
                      placeholder="Qty"
                      type="number"
                      value={row.quantity}
                      onChange={(e) => updateRow(rowIndex, 'quantity', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                      className={`${!validateField('quantity', row.quantity) && row.quantity.length > 0 ? 'border-destructive' : ''}`}
                    />
                    <Input
                      ref={(el) => inputRefs.current[getInputIndex(rowIndex, 2)] = el}
                      placeholder="Price"
                      type="number"
                      step="0.01"
                      value={row.price}
                      onChange={(e) => updateRow(rowIndex, 'price', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
                      className={`${!validateField('price', row.price) && row.price.length > 0 ? 'border-destructive' : ''}`}
                    />
                    {isVaryingGst && (
                      <Input
                        ref={(el) => inputRefs.current[getInputIndex(rowIndex, 3)] = el}
                        placeholder="GST %"
                        type="number"
                        step="0.01"
                        value={row.gst}
                        onChange={(e) => updateRow(rowIndex, 'gst', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
                        className={`${!validateField('gst', row.gst) && row.gst.length > 0 ? 'border-destructive' : ''}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Summary */}
              {totals.products.length > 0 && (
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST:</span>
                    <span>₹{totals.gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">₹{totals.total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            variant="floating"
            size="lg"
            className="flex-1"
            onClick={generateInvoice}
            disabled={totals.products.length === 0}
          >
            <FileText className="w-5 h-5" />
            Generate Invoice
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowCalculator(!showCalculator)}
          >
            <Calculator className="w-5 h-5" />
          </Button>
        </div>

        {/* Calculator */}
        {showCalculator && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-background border rounded-lg p-4 text-right text-2xl font-mono min-h-[60px] flex items-center justify-end">
                  {calculatorDisplay}
                </div>
                <CalculatorKeypad onInput={handleCalculatorAction} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Invoice Generator */}
      <InvoiceGenerator
        open={showInvoice}
        onClose={() => setShowInvoice(false)}
        invoiceData={{
          products: totals.products,
          customer: null,
          amount: totals.total,
          subtotal: totals.subtotal,
          gst: totals.gst,
          gstRate: isVaryingGst ? undefined : fixedGstRate
        }}
        onGenerate={handleInvoiceGenerate}
      />
    </div>
  );
};

export default Home;
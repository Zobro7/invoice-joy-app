import { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  User, 
  Package, 
  Send, 
  Share, 
  Download,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
}

interface InvoiceData {
  products: Product[];
  customer: Customer | null;
  amount: number;
}

interface InvoiceGeneratorProps {
  open: boolean;
  onClose: () => void;
  invoiceData: InvoiceData;
  onGenerate: () => void;
}

export const InvoiceGenerator = ({ open, onClose, invoiceData, onGenerate }: InvoiceGeneratorProps) => {
  const [step, setStep] = useState<'review' | 'share' | 'payment'>('review');
  const [isGenerating, setIsGenerating] = useState(false);

  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  const today = new Date().toLocaleDateString('en-IN');

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate invoice generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsGenerating(false);
    setStep('share');
    onGenerate();
  };

  const handleShare = () => {
    setStep('payment');
  };

  const shareToWhatsApp = () => {
    const message = `Invoice ${invoiceNumber}
Customer: ${invoiceData.customer?.name}
Amount: ₹${invoiceData.amount.toFixed(2)}
Items: ${invoiceData.products.map(p => p.name).join(', ')}

Thank you for your business!`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[90vh]">
        <SheetHeader className="text-center">
          <SheetTitle>
            {step === 'review' && 'Review Invoice'}
            {step === 'share' && 'Share Invoice'}
            {step === 'payment' && 'Payment Options'}
          </SheetTitle>
          <SheetDescription>
            {step === 'review' && 'Verify details before generating'}
            {step === 'share' && 'Send invoice to your customer'}
            {step === 'payment' && 'Accept payment methods'}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6 overflow-y-auto max-h-[70vh]">
          {step === 'review' && (
            <div className="space-y-4">
              {/* Invoice Header */}
              <Card className="p-4 bg-gradient-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Invoice {invoiceNumber}</h3>
                    <p className="text-sm text-muted-foreground">Date: {today}</p>
                  </div>
                  <FileText className="w-8 h-8 text-primary" />
                </div>
              </Card>

              {/* Customer Info */}
              {invoiceData.customer && (
                <Card className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <User className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">Bill To:</h4>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{invoiceData.customer.name}</p>
                    {invoiceData.customer.company && (
                      <p className="text-sm text-muted-foreground">{invoiceData.customer.company}</p>
                    )}
                    {invoiceData.customer.email && (
                      <p className="text-sm text-muted-foreground">{invoiceData.customer.email}</p>
                    )}
                    {invoiceData.customer.phone && (
                      <p className="text-sm text-muted-foreground">{invoiceData.customer.phone}</p>
                    )}
                  </div>
                </Card>
              )}

              {/* Products */}
              <Card className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Package className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Items:</h4>
                </div>
                <div className="space-y-3">
                  {invoiceData.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        {product.description && (
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                        )}
                      </div>
                      <p className="font-medium">₹{product.price.toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">₹{invoiceData.amount.toFixed(2)}</span>
                  </div>
                </div>
              </Card>

              <Button 
                variant="floating"
                size="xl"
                className="w-full"
                onClick={handleGenerate}
                disabled={isGenerating || !invoiceData.customer || invoiceData.products.length === 0}
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Generate Invoice
                  </>
                )}
              </Button>
            </div>
          )}

          {step === 'share' && (
            <div className="space-y-4">
              <Card className="p-4 bg-success/10 border-success/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <div>
                    <h3 className="font-medium text-success">Invoice Generated!</h3>
                    <p className="text-sm text-muted-foreground">Ready to share with customer</p>
                  </div>
                </div>
              </Card>

              <div className="space-y-3">
                <h3 className="font-medium">Share Options</h3>
                
                <Button 
                  variant="default"
                  size="lg"
                  className="w-full justify-between"
                  onClick={shareToWhatsApp}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Send className="w-3 h-3 text-white" />
                    </div>
                    <span>Send via WhatsApp</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Share className="w-5 h-5" />
                    <span>Share Link</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <Button 
                variant="floating"
                size="xl"
                className="w-full"
                onClick={handleShare}
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-medium mb-3">Payment Methods</h3>
                <div className="space-y-3">
                  <Card className="p-3 border-primary/20 bg-primary/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">UPI Payment</p>
                        <p className="text-sm text-muted-foreground">Instant bank transfer</p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        Recommended
                      </Badge>
                    </div>
                  </Card>
                  
                  <Card className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-muted-foreground">Traditional wire transfer</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Cash Payment</p>
                        <p className="text-sm text-muted-foreground">Mark as paid manually</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>

              <Button 
                variant="success"
                size="xl"
                className="w-full"
                onClick={() => {
                  // Mark as paid and close
                  onClose();
                }}
              >
                <CheckCircle className="w-5 h-5" />
                Mark as Paid
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
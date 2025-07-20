import { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, User, Mail, Phone } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
}

interface CustomerSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelectCustomer: (customer: Customer) => void;
}

const defaultCustomers: Customer[] = [
  { id: "c1", name: "John Doe", email: "john@example.com", phone: "+91 98765 43210", company: "Tech Corp" },
  { id: "c2", name: "Jane Smith", email: "jane@startup.com", phone: "+91 87654 32109", company: "Startup Inc" },
  { id: "c3", name: "Bob Wilson", email: "bob@business.com", phone: "+91 76543 21098", company: "Local Business" }
];

export const CustomerSelector = ({ open, onClose, onSelectCustomer }: CustomerSelectorProps) => {
  const [customers, setCustomers] = useState<Customer[]>(defaultCustomers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    company: "" 
  });

  const handleAddCustomer = () => {
    if (newCustomer.name) {
      const customer: Customer = {
        id: `custom_${Date.now()}`,
        name: newCustomer.name,
        email: newCustomer.email || undefined,
        phone: newCustomer.phone || undefined,
        company: newCustomer.company || undefined
      };
      setCustomers([...customers, customer]);
      setNewCustomer({ name: "", email: "", phone: "", company: "" });
      setShowAddForm(false);
    }
  };

  const handleSelectCustomer = (customer: Customer) => {
    onSelectCustomer(customer);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[80vh]">
        <SheetHeader className="text-center">
          <SheetTitle>Select Customer</SheetTitle>
          <SheetDescription>
            Choose from contacts or add a new customer
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mt-6 overflow-y-auto max-h-[60vh]">
          {!showAddForm ? (
            <>
              {/* Customer List */}
              <div className="space-y-3">
                {customers.map((customer) => (
                  <Card 
                    key={customer.id}
                    className="p-4 cursor-pointer hover:shadow-card transition-all"
                    onClick={() => handleSelectCustomer(customer)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-primary" />
                        <div>
                          <h3 className="font-medium">{customer.name}</h3>
                          {customer.company && (
                            <p className="text-sm text-muted-foreground">{customer.company}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-1">
                            {customer.email && (
                              <div className="flex items-center space-x-1">
                                <Mail className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{customer.email}</span>
                              </div>
                            )}
                            {customer.phone && (
                              <div className="flex items-center space-x-1">
                                <Phone className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{customer.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {customer.id.startsWith('c') && (
                        <Badge variant="outline" className="text-xs">Preset</Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Add New Customer Button */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowAddForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Customer
              </Button>
            </>
          ) : (
            /* Add Customer Form */
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Customer Name *</Label>
                <Input
                  id="customer-name"
                  placeholder="Enter customer name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customer-email">Email</Label>
                <Input
                  id="customer-email"
                  type="email"
                  placeholder="customer@example.com"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customer-phone">Phone</Label>
                <Input
                  id="customer-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-company">Company</Label>
                <Input
                  id="customer-company"
                  placeholder="Company name"
                  value={newCustomer.company}
                  onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewCustomer({ name: "", email: "", phone: "", company: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  className="flex-1"
                  onClick={handleAddCustomer}
                  disabled={!newCustomer.name}
                >
                  Add Customer
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
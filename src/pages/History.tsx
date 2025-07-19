import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Check, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const History = () => {
  const invoices = [
    {
      id: "INV-001",
      customer: "John Doe",
      amount: 1250.00,
      status: "paid",
      date: "2024-01-15",
      items: ["Web Design", "Logo Design"]
    },
    {
      id: "INV-002", 
      customer: "Jane Smith",
      amount: 750.00,
      status: "pending",
      date: "2024-01-14",
      items: ["Mobile App UI"]
    },
    {
      id: "INV-003",
      customer: "Tech Corp",
      amount: 2100.00,
      status: "overdue",
      date: "2024-01-10",
      items: ["Website Development", "SEO Setup"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            <Check className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
            <AlertCircle className="w-3 h-3 mr-1" />
            Overdue
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border px-6 py-4">
        <h1 className="text-xl font-bold text-foreground">Invoice History</h1>
        <p className="text-sm text-muted-foreground">Track all your invoices</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Search and Filter */}
        <div className="flex space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search invoices..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center shadow-card">
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </Card>
          <Card className="p-4 text-center shadow-card">
            <div className="text-2xl font-bold text-success">₹1,250</div>
            <div className="text-xs text-muted-foreground">Paid</div>
          </Card>
          <Card className="p-4 text-center shadow-card">
            <div className="text-2xl font-bold text-warning">₹2,850</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </Card>
        </div>

        {/* Invoice List */}
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="p-4 shadow-card hover:shadow-floating transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{invoice.id}</h3>
                    {getStatusBadge(invoice.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{invoice.customer}</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(invoice.date).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {invoice.items.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    ₹{invoice.amount.toFixed(2)}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
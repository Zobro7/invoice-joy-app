import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹45,230",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Customers",
      value: "24",
      change: "+3 new",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Products",
      value: "18",
      change: "+2 added",
      icon: ShoppingCart,
      color: "text-warning"
    },
    {
      title: "Growth",
      value: "23%",
      change: "this month",
      icon: TrendingUp,
      color: "text-success"
    }
  ];

  const recentCustomers = [
    { name: "John Doe", email: "john@example.com", invoices: 3 },
    { name: "Jane Smith", email: "jane@example.com", invoices: 1 },
    { name: "Tech Corp", email: "contact@techcorp.com", invoices: 2 }
  ];

  const products = [
    { name: "Web Design", price: 500, category: "Service" },
    { name: "Logo Design", price: 150, category: "Design" },
    { name: "Mobile App UI", price: 750, category: "Service" },
    { name: "SEO Setup", price: 300, category: "Marketing" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border px-6 py-4">
        <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Analytics & inventory management</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 shadow-card hover:shadow-floating transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className={`text-xs ${stat.color}`}>{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">This Month</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Invoices created</span>
              <span className="font-semibold text-foreground">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Payments received</span>
              <span className="font-semibold text-success">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pending invoices</span>
              <span className="font-semibold text-warning">4</span>
            </div>
          </div>
        </Card>

        {/* Customers Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Customers</h3>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Customer
            </Button>
          </div>
          
          <div className="space-y-2">
            {recentCustomers.map((customer, index) => (
              <Card key={index} className="p-4 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{customer.invoices} invoices</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Products & Services</h3>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Product
            </Button>
          </div>
          
          <div className="space-y-2">
            {products.map((product, index) => (
              <Card key={index} className="p-4 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">₹{product.price}</span>
                      <Badge variant="outline" className="text-xs">{product.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
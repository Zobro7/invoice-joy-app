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
import { Plus, Package, Edit } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface ProductSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const defaultProducts: Product[] = [
  { id: "p1", name: "Website Design", price: 5000, description: "Custom website design" },
  { id: "p2", name: "Logo Design", price: 2000, description: "Brand logo creation" },
  { id: "p3", name: "Consultation", price: 1500, description: "1 hour consultation" }
];

export const ProductSelector = ({ open, onClose, onSelectProduct }: ProductSelectorProps) => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "" });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product: Product = {
        id: `custom_${Date.now()}`,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description
      };
      setProducts([...products, product]);
      setNewProduct({ name: "", price: "", description: "" });
      setShowAddForm(false);
    }
  };

  const handleSelectProduct = (product: Product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[80vh]">
        <SheetHeader className="text-center">
          <SheetTitle>Select Product</SheetTitle>
          <SheetDescription>
            Choose from presets or add a new product
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mt-6 overflow-y-auto max-h-[60vh]">
          {!showAddForm ? (
            <>
              {/* Product List */}
              <div className="space-y-3">
                {products.map((product) => (
                  <Card 
                    key={product.id}
                    className="p-4 cursor-pointer hover:shadow-card transition-all"
                    onClick={() => handleSelectProduct(product)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-primary" />
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          {product.description && (
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">₹{product.price.toFixed(2)}</div>
                        {product.id.startsWith('p') && (
                          <Badge variant="outline" className="text-xs">Preset</Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Add New Product Button */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowAddForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </>
          ) : (
            /* Add Product Form */
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-price">Price (₹)</Label>
                <Input
                  id="product-price"
                  type="number"
                  placeholder="0.00"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-description">Description (Optional)</Label>
                <Input
                  id="product-description"
                  placeholder="Brief description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewProduct({ name: "", price: "", description: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  className="flex-1"
                  onClick={handleAddProduct}
                  disabled={!newProduct.name || !newProduct.price}
                >
                  Add Product
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
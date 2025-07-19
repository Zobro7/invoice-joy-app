import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  User, 
  ShoppingCart, 
  FileText, 
  Settings, 
  HelpCircle,
  Star,
  Moon,
  Sun
} from "lucide-react";

interface QuickActionsProps {
  open: boolean;
  onClose: () => void;
}

export const QuickActions = ({ open, onClose }: QuickActionsProps) => {
  const quickActions = [
    {
      icon: ShoppingCart,
      title: "Quick Add Product",
      description: "Add a new product to your inventory",
      action: () => console.log("Add product")
    },
    {
      icon: User,
      title: "Quick Add Customer",
      description: "Add a new customer to your contacts",
      action: () => console.log("Add customer")
    },
    {
      icon: FileText,
      title: "Custom Invoice Template",
      description: "Create custom invoice layouts (Coming Soon)",
      action: () => console.log("Custom template"),
      disabled: true
    }
  ];

  const settingsActions = [
    {
      icon: Settings,
      title: "Settings",
      description: "App preferences and configuration",
      action: () => console.log("Settings")
    },
    {
      icon: HelpCircle,
      title: "Help & Guide",
      description: "Get help and learn features",
      action: () => console.log("Help")
    },
    {
      icon: Star,
      title: "Rate Us",
      description: "Like this app? Give us 5 stars!",
      action: () => console.log("Rate app")
    }
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader className="text-center">
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>
            Fast shortcuts to common tasks
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Create</h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  onClick={action.action}
                  disabled={action.disabled}
                >
                  <action.icon className="w-5 h-5 mr-3 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Settings Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">More</h3>
            <div className="space-y-2">
              {settingsActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-4"
                  onClick={action.action}
                >
                  <action.icon className="w-5 h-5 mr-3 text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
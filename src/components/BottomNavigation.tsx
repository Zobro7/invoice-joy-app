import { NavLink } from "react-router-dom";
import { Home, Clock, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export const BottomNavigation = () => {
  const navItems = [
    {
      to: "/home",
      icon: Home,
      label: "Home"
    },
    {
      to: "/history",
      icon: Clock,
      label: "History"
    },
    {
      to: "/dashboard",
      icon: BarChart3,
      label: "Dashboard"
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around px-6 py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200",
                isActive
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
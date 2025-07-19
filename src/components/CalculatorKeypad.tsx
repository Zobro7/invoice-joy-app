import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

interface CalculatorKeypadProps {
  onInput: (value: string) => void;
}

export const CalculatorKeypad = ({ onInput }: CalculatorKeypadProps) => {
  const keys = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    [".", "0", "⌫"]
  ];

  const handleKeyPress = (key: string) => {
    if (key === "⌫") {
      onInput("backspace");
    } else {
      onInput(key);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground text-center">
        Enter Amount
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {keys.flat().map((key, index) => (
          <Button
            key={index}
            variant="calculator"
            size="calc"
            onClick={() => handleKeyPress(key)}
            className={`
              ${key === "⌫" ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : ""}
              ${key === "." ? "bg-accent text-accent-foreground" : ""}
            `}
          >
            {key === "⌫" ? <Delete className="w-5 h-5" /> : key}
          </Button>
        ))}
      </div>
      <div className="flex space-x-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onInput("clear")}
        >
          Clear
        </Button>
        <Button
          variant="success"
          className="flex-1"
          onClick={() => onInput("=")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
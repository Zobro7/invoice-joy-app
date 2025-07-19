import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

interface InvoiceCounterProps {
  count: number;
}

export const InvoiceCounter = ({ count }: InvoiceCounterProps) => {
  return (
    <Badge variant="outline" className="bg-accent/50 text-accent-foreground">
      <FileText className="w-3 h-3 mr-1" />
      {count} invoices
    </Badge>
  );
};
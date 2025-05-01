import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataTableSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  headerActions?: ReactNode;
  className?: string;
}

export default function DataTableSection({
  title,
  description,
  children,
  headerActions,
  className = "shadow-none",
}: DataTableSectionProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

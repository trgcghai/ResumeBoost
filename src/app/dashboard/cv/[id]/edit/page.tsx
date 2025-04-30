import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CvEditPage({ params }: PageProps) {
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Chỉnh sửa CV</CardTitle>
        </CardHeader>
        <CardContent>
          <p>ID CV: {params.id}</p>
          {/* Thêm form chỉnh sửa CV ở đây */}
        </CardContent>
      </Card>
    </div>
  );
} 
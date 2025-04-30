import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CvDetailPage({ params }: PageProps) {
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết CV</CardTitle>
        </CardHeader>
        <CardContent>
          <p>ID CV: {params.id}</p>
          {/* Thêm nội dung chi tiết CV ở đây */}
        </CardContent>
      </Card>
    </div>
  );
} 
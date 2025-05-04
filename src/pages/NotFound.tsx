import { FileX2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <FileX2 size={120} className="text-main/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-main">404</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trang không tìm thấy
          </h1>
          <p className="text-gray-500">
            Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-main hover:bg-main/90">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Về trang chủ
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Không Có Quyền Truy Cập</h1>
      <p className="text-lg mb-8">
        Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị
        viên nếu bạn cho rằng đây là một lỗi.
      </p>
      <div className="flex gap-4">
        <Button
          variant="default"
          size={"lg"}
          className="bg-main hover:bg-mainHover text-white cursor-pointer font-bold text-lg py-6 px-8"
          onClick={() => navigate("/")}
        >
          Về Trang Chủ
        </Button>
      </div>
    </div>
  );
};

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-bgLight">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-textDark">
            Đăng ký
          </CardTitle>
          <CardDescription className="text-textNormal">
            Tạo tài khoản mới để sử dụng dịch vụ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-textDark">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  className="ring-main focus-visible:ring-main"
                />
              </div>

              {/* Mật khẩu */}
              <div className="grid gap-3">
                <Label htmlFor="password" className="text-textDark">
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="ring-main focus-visible:ring-main pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-textLight"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeIcon className="h-4 w-4" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Xác nhận mật khẩu */}
              <div className="grid gap-3">
                <Label htmlFor="confirm-password" className="text-textDark">
                  Xác nhận mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="ring-main focus-visible:ring-main pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-textLight"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeIcon className="h-4 w-4" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-main hover:bg-mainHover text-white"
                >
                  Đăng ký
                </Button>

                {/* Divider */}
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-bgLight px-2 text-sm text-textNormal">
                      Hoặc
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-bgNormal text-textDark hover:bg-bgNormal"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Đăng ký với Google
                </Button>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-textNormal">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-main hover:text-mainHover underline underline-offset-4"
              >
                Đăng nhập
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

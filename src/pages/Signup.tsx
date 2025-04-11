import HeaderLogin from "../components/HeaderLogin";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "var(--color-bgLight)" }}
    >
      <HeaderLogin />

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
        <div
          className="bg-white py-8 px-6 w-full max-w-md rounded-lg shadow"
          style={{ border: "1px solid var(--color-bgNormal)" }}
        >
          <h2
            className="text-center text-xl font-semibold"
            style={{ color: "var(--color-textDark)" }}
          >
            Đăng ký
          </h2>
          <p
            className="mt-1 text-center text-sm"
            style={{ color: "var(--color-textLight)" }}
          >
            Đã có tài khoản?{" "}
            <a
              href="/login"
              className="font-medium underline"
              style={{ color: "var(--color-textLight)" }}
            >
              Đăng nhập ngay
            </a>
          </p>

          <form className="space-y-6 mt-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--color-textDark)" }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm text-sm"
                style={{
                  borderColor: "var(--color-bgNormal)",
                  color: "var(--color-textDark)",
                  background: "var(--color-bgLight)",
                }}
              />
            </div>

            {/* Mật khẩu */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--color-textDark)" }}
              >
                Mật khẩu
              </label>
              <div className="relative">
                {" "}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-3 py-2 pr-10 border rounded-md shadow-sm text-sm"
                  style={{
                    borderColor: "var(--color-bgNormal)",
                    color: "var(--color-textDark)",
                    background: "var(--color-bgLight)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-2"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--color-textDark)" }}
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                {" "}
                {/* ✅ Bọc input và icon */}
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="w-full px-3 py-2 pr-10 border rounded-md shadow-sm text-sm"
                  style={{
                    borderColor: "var(--color-bgNormal)",
                    color: "var(--color-textDark)",
                    background: "var(--color-bgLight)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-2 top-2"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Nút đăng ký */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md text-sm font-medium text-white shadow-sm hover:cursor-pointer"
                style={{
                  backgroundColor: "var(--color-main)",
                }}
              >
                Đăng ký
              </button>
            </div>
          </form>

          {/* Hoặc */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div
                  className="w-full border-t"
                  style={{ borderColor: "var(--color-bgNormal)" }}
                />
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-2 bg-white"
                  style={{ color: "var(--color-textLight)" }}
                >
                  Hoặc
                </span>
              </div>
            </div>

            {/* Google Button */}
            <div className="mt-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border rounded-md shadow-sm text-sm font-medium hover:cursor-pointer"
                style={{
                  borderColor: "var(--color-bgNormal)",
                  color: "var(--color-main)",
                  backgroundColor: "white",
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Tiếp tục với Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

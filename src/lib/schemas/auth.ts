import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
});

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "Email không hợp lệ" }),
    username: z
      .string()
      .min(3, { message: "Tên người dùng phải có ít nhất 3 ký tự" })
      .max(20, { message: "Tên người dùng không được quá 20 ký tự" }),
    password: z
      .string()
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Xác nhận mật khẩu phải có ít nhất 8 ký tự" }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Mật khẩu không khớp",
      path: ["confirmPassword"],
    }
  );

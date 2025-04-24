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
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { auth, functions } from "@/lib/firebase";
import { useAppDispatch } from "@/hooks/redux";
import { login } from "@/store/slices/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import GoogleAuth from "./GoogleAuth";
import { httpsCallable } from "firebase/functions";

const signUpSchema = z
  .object({
    email: z.string().email({ message: "Email không hợp lệ" }),
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

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface responeType {
  success: boolean;
  message: string;
  error?: object;
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("Form submitted", data);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const { email, uid, photoURL } = result.user;

      dispatch(login({ email: email || "", id: uid, avatar: photoURL || "" }));
      const createUserProfile = httpsCallable(functions, "createUserProfile");
      const res = (await createUserProfile({ userId: uid })) as {
        data: responeType;
      };
      if (res.data.success) {
        console.log("User profile created successfully");
        navigate("/");
      } else {
        console.log(
          "User profile already exists or error occurred",
          res.data.message
        );
      }

      navigate("/");
    } catch (error) {
      console.log(error);

      if (
        error instanceof Error &&
        error.message.includes("auth/email-already-in-use")
      ) {
        form.setError("email", {
          type: "manual",
          message: "Email đã được sử dụng",
        });
      } else {
        form.setError("root", {
          type: "manual",
          message: "Đăng ký không thành công. Vui lòng thử lại sau.",
        });
      }
    }
  };

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textDark">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        className="ring-main focus-visible:ring-main"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel className="text-textDark">Mật khẩu</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu của bạn"
                        className="ring-main focus-visible:ring-main"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel className="text-textDark">
                        Xác nhận mật khẩu
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        className="ring-main focus-visible:ring-main"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-main hover:bg-mainHover text-white cursor-pointer"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
                </Button>

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

                <GoogleAuth />
              </div>

              <div className="mt-6 text-center text-sm text-textNormal">
                Đã có tài khoản?{" "}
                <Link
                  to="/auth/login"
                  className="text-main hover:text-mainHover underline underline-offset-4"
                >
                  Đăng nhập
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

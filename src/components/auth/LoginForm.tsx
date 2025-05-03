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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/hooks/redux";
import { login } from "@/store/slices/userSlice";
import GoogleAuth from "./GoogleAuth";
import { loginSchema } from "@/lib/schemas/auth";

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const { email, uid, photoURL } = result.user;

      dispatch(login({ email: email || "", id: uid, avatar: photoURL || "" }));

      // Get the return URL from location state, or default to home
      const from = location.state?.from || "/home";
      navigate(from, { replace: true });
    } catch (error) {
      console.log("Error signing in:", error);
      // Handle login error
      form.setError("root", {
        type: "manual",
        message: "Email hoặc mật khẩu không đúng",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-bgLight">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-textDark">
            Đăng nhập
          </CardTitle>
          <CardDescription className="text-textNormal">
            Nhập thông tin đăng nhập của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {form.formState.errors.root && (
                <p className="text-red-500 text-sm text-center">
                  {form.formState.errors.root.message}
                </p>
              )}
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textDark">Email</FormLabel>
                    <FormControl>
                      <Input
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
                      <Link
                        to="/auth/forgot-password"
                        className="ml-auto inline-block text-sm text-main hover:text-mainHover underline-offset-4 hover:underline"
                      >
                        Quên mật khẩu?
                      </Link>
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

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-main hover:bg-mainHover text-white cursor-pointer"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Đang đăng nhập..."
                    : "Đăng nhập"}
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
                Chưa có tài khoản?{" "}
                <Link
                  to="/auth/signup"
                  className="text-main hover:text-mainHover underline underline-offset-4"
                >
                  Đăng ký
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

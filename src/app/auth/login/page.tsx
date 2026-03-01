"use client";

import { MainLayout } from "@/layouts/MainLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authApi } from "@/api/authApi";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/paths";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";

const LoginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const { login } = useAuthStore();
  const router = useRouter();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await authApi.login(values);
      login(res.data.user, res.data.token);
      showToast("Đăng nhập thành công", "success");
      router.replace(paths.userDashboard);
    } catch (e) {
      showToast((e as Error).message, "error");
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto mt-6 max-w-sm rounded-xl bg-white p-5 shadow-sm">
        <h1 className="text-base font-semibold text-slate-800">Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
          <Input
            label="Email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            type="password"
            label="Mật khẩu"
            {...register("password")}
            error={errors.password?.message}
          />
          <Button type="submit" loading={isSubmitting} className="w-full">
            Đăng nhập
          </Button>
        </form>
        <p className="mt-3 text-center text-xs text-slate-600">
          Chưa có tài khoản?{" "}
          <Link href={paths.register} className="text-sky-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
        <p className="mt-2 text-center text-[11px] text-slate-500">
          Demo: admin@haisanquangninh.vn / user@example.com (mật khẩu bất kỳ)
        </p>
      </div>
    </MainLayout>
  );
};

export default LoginPage;

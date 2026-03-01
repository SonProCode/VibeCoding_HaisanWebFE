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

const RegisterSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const { login } = useAuthStore();
  const router = useRouter();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const res = await authApi.register(values);
      login(res.data.user, res.data.token);
      showToast("Đăng ký thành công", "success");
      router.replace(paths.userDashboard);
    } catch (e) {
      showToast((e as Error).message, "error");
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto mt-6 max-w-sm rounded-xl bg-white p-5 shadow-sm">
        <h1 className="text-base font-semibold text-slate-800">Đăng ký</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
          <Input
            label="Họ tên"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Số điện thoại"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <Input
            type="password"
            label="Mật khẩu"
            {...register("password")}
            error={errors.password?.message}
          />
          <Button type="submit" loading={isSubmitting} className="w-full">
            Đăng ký
          </Button>
        </form>
        <p className="mt-3 text-center text-xs text-slate-600">
          Đã có tài khoản?{" "}
          <Link href={paths.login} className="text-sky-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;

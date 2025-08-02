"use client";

import { useState } from "react";
import { userLogin } from "@/services/actions/userLogin";
import { userRegister } from "@/services/actions/userRegister";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "@/schema/authSchema";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const formType = searchParams.get("type");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(formType !== "register");
  const router = useRouter();

  const toggleForm = () => {
    const newType = isLogin ? "register" : "login";
    router.replace(`/auth?type=${newType}`);
    setIsLogin(!isLogin);
    setError("");
  };

  const handleLogin = async (values: FieldValues) => {
    try {
      setLoading(true);
      const res = await userLogin(values);
      // console.log(res);
      if (res?.data?.token) {
        toast.success(res?.message);
        router.push("/");
        setLoading(false);
      } else {
        setError(res.message);
      }
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: FieldValues) => {
    try {
      setLoading(true);
      const res = await userRegister(data);
      if (res?.data?.id) {
        toast.success(res.message);
        router.push("/");
        setLoading(false);
      }
      if (res?.success === false) {
        setError(res?.message || "Registration failed!");
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message || "Registration failed";
        setError(errorMessage);
      } else {
        setError("Unexpected error");
      }
      setLoading(false);
    } finally {
      setLoading(true);
    }
  };

  const handleTestLogin = async (role: "instructor" | "student") => {
    const credentials =
      role === "instructor"
        ? {
            identifier: `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`,
            password: `${process.env.NEXT_PUBLIC_ADMIN_PASSWORD}`,
          }
        : {
            identifier: `${process.env.NEXT_PUBLIC_USER_EMAIL}`,
            password: `${process.env.NEXT_PUBLIC_USER_PASSWORD}`,
          };
    handleLogin(credentials);
  };

  return (
    <div className="w-screen h-screen mx-auto">
      {/* Form Section */}
      <div className="flex justify-center items-center bg-white px-6 sm:px-10 overflow-y-auto">
        {isLogin ? (
          <LoginForm
            onSubmit={handleLogin}
            error={error}
            toggle={toggleForm}
            onTestLogin={handleTestLogin}
            loading={loading}
          />
        ) : (
          <RegisterForm
            onSubmit={handleRegister}
            error={error}
            toggle={toggleForm}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;

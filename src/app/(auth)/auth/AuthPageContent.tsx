"use client";

import { useState } from "react";
import { userRegister } from "@/services/actions/userRegister";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { signIn, getSession } from "next-auth/react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const AuthPage = () => {
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
    console.log("Login attempt with:", { identifier: values.identifier });

    try {
      setLoading(true);
      setError("");

      const result = await signIn("credentials", {
        identifier: values.identifier,
        password: values.password,
        redirect: false,
      });

      if (result?.ok) {
        const session = await getSession();

        if (session?.user?.role) {
          const redirectUrl =
            session.user.role === "INSTRUCTOR"
              ? "/dashboard/instructor/overview"
              : "/dashboard/student/overview";

          toast.success("Login successful!");
          router.push(redirectUrl);
          return;
        } else {
          toast.error("Unable to determine user role");
        }
      }
    } catch (err) {
      console.error("Login exception:", err);
      setError("Login failed");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: FieldValues) => {
    try {
      setLoading(true);
      setError("");

      const res = await userRegister(data);
      console.log("Registration response:", res);

      if (res?.data?.id) {
        toast.success(res.message || "Registration successful!");

        // Auto-login after registration
        const loginResult = await signIn("credentials", {
          identifier: data.email,
          password: data.password,
          redirect: false,
        });
        console.log("res", loginResult);

        if (loginResult?.ok) {
          const session = await getSession();
          console.log("session", session);
          const redirectUrl =
            session?.user?.role === "INSTRUCTOR"
              ? "/dashboard/instructor/overview"
              : "/dashboard/student/overview";
          router.push(redirectUrl);
        }
      } else if (res?.success === false) {
        setError(res?.message || "Registration failed!");
        toast.error(res?.message || "Registration failed!");
      }
    } catch (err) {
      let errorMessage = "Registration failed";

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      }

      console.error("Registration error:", err);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Move test credentials to server-side or use a different approach
  const handleTestLogin = async (role: "instructor" | "student") => {
    const credentials =
      role === "instructor"
        ? {
            identifier: process.env.NEXT_PUBLIC_INSTRUCTOR_EMAIL!,
            password: process.env.NEXT_PUBLIC_INSTRUCTOR_PASSWORD!,
          }
        : {
            identifier: process.env.NEXT_PUBLIC_STUDENT_EMAIL!,
            password: process.env.NEXT_PUBLIC_STUDENT_PASSWORD!,
          };

    console.log(credentials);

    await handleLogin(credentials);
  };

  return (
    <div className="w-screen h-screen mx-auto">
      <div className="flex justify-center items-center bg-white px-6 sm:px-10 overflow-y-auto min-h-screen">
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

export default AuthPage;

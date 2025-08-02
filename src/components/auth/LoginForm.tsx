// components/Auth/LoginForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";
import FormContainer from "../custom/Forms/FormContainer";
import FormInput from "../custom/Forms/FormInput";
import { loginValidationSchema, TLoginFormValues } from "@/schema/authSchema";

interface LoginFormProps {
  onSubmit: (values: TLoginFormValues) => void;
  error?: string;
  toggle: () => void;
  onTestLogin: (type: "instructor" | "student") => void;
  loading: boolean;
}

const LoginForm = ({
  onSubmit,
  error,
  toggle,
  onTestLogin,
  loading,
}: LoginFormProps) => {
  return (
    <div className="w-full max-w-sm space-y-5">
      <div className="text-left">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome Back to Task Track!
          <br />
          <span>Submit Your Assignments</span>
        </h2>
        <p className="text-sm text-gray-500 mt-2">Sign in to your account</p>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <FormContainer
        onSubmit={onSubmit}
        resolver={zodResolver(loginValidationSchema)}
        defaultValues={{ identifier: "", password: "" }}
      >
        <div className="space-y-4">
          <FormInput
            name="identifier"
            label="Your Email or Username"
            type="text"
            required
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            required
          />
        </div>

        <div className="flex items-center justify-between mt-3 mb-2 space-x-6">
          <div className="flex items-center text-xs text-gray-500">
            <input type="checkbox" className="mr-2" />
            <p>Remember Me</p>
          </div>
          <Link
            href="#"
            className="text-xs text-slate-800 underline cursor-pointer font-semibold"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-slate-800 text-white hover:bg-slate-700"
          disabled={loading}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login"}
        </Button>
      </FormContainer>
      <div className="flex justify-between">
        <Button
          variant="outline"
          className="bg-transparent border-slate-600 hover:bg-slate-800 hover:text-white hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
          onClick={() => onTestLogin("instructor")}
        >
          User Login
          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
        <Button
          variant="outline"
          className="bg-transparent border-slate-600 hover:bg-slate-800 hover:text-white hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
          onClick={() => onTestLogin("student")}
        >
          Admin Login
          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>

      <p className="text-sm text-center mt-3">
        Don&apos;t have any account?{" "}
        <button
          type="button"
          onClick={toggle}
          className=" text-slate-800 underline cursor-pointer font-semibold"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;

"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Loader2 } from "lucide-react";
import FormContainer from "../custom/Forms/FormContainer";
import FormInput from "../custom/Forms/FormInput";
import FormSelect from "../custom/Forms/FormSelect";
import {
  TRegisterFormValues,
  registerValidationSchema,
} from "@/schema/authSchema";

interface RegisterFormProps {
  onSubmit: (values: TRegisterFormValues) => void;
  error?: string;
  toggle: () => void;
  loading: boolean;
}

const RegisterForm = ({
  onSubmit,
  error,
  toggle,
  loading,
}: RegisterFormProps) => {
  return (
    <div className="w-full max-w-sm space-y-5">
      <div className="text-left">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome to Task Track
          <br />
          <span>Create your account</span>
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Register to enjoy all features of Task Track
        </p>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <FormContainer<TRegisterFormValues>
        onSubmit={onSubmit}
        resolver={zodResolver(registerValidationSchema)}
        defaultValues={{
          username: "",
          email: "",
          role: "" as "INSTRUCTOR" | "STUDENT",
          password: "",
        }}
      >
        <div className="space-y-4">
          <FormInput name="username" label="Username" type="text" required />
          <FormInput name="email" label="Email" type="email" required />
          <FormSelect
            label="Register As"
            name="role"
            placeholder="Select account type"
            options={[
              { label: "Instructor", value: "INSTRUCTOR" },
              { label: "Student", value: "STUDENT" },
            ]}
            required
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            required
          />
        </div>

        <div className="flex items-start text-xs text-gray-500 mt-2">
          <input type="checkbox" className="mr-2 mt-0.5" />
          <p>
            By registering, you agree to our{" "}
            <Link href="#" className="text-slate-800 underline font-semibold">
              Terms & Privacy Policy
            </Link>
          </p>
        </div>

        <Button
          type="submit"
          className="w-full mt-4 bg-black text-white hover:bg-gray-900"
          disabled={loading}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Register"}
        </Button>
      </FormContainer>

      <p className="text-sm text-center mt-3">
        Already have an account?{" "}
        <button
          type="button"
          onClick={toggle}
          className="text-slate-800 underline cursor-pointer font-semibold"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;

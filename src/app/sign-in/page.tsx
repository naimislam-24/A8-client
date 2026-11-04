"use client";

import { authClient, signIn } from "@/lib/auth-client";

import {
  Button,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  HeartHandshake,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      const { data: resData, error } = await signIn.email({
        email: data.email as string,
        password: data.password as string,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (resData) {
        toast.success("Login successful!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     setGoogleLoading(true);

  //     await signIn.social({
  //       provider: "google",
  //       callbackURL: "/",
  //     });
  //   } catch {
  //     toast.error("Google login failed. Please try again.");
  //     setGoogleLoading(false);
  //   }
  // };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10b981] shadow-lg shadow-emerald-500/20">
            <HeartHandshake
              size={27}
              className="text-white"
              strokeWidth={2.2}
            />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Sign in to organize and join community drives
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_40px_rgba(0,0,0,0.05)] sm:p-7">
          <Form className="w-full" onSubmit={onSubmit}>
            <Fieldset className="w-full">
              <FieldGroup className="gap-5">
                {/* Email */}
                <TextField isRequired name="email" type="email">
                  <Label className="mb-1.5 text-sm font-semibold text-gray-800">
                    Email
                  </Label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <Input
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus-within:border-emerald-500 focus-within:bg-white"
                      placeholder="name@example.com"
                    />
                  </div>
                </TextField>

                {/* Password */}
                <TextField
                  isRequired
                  name="password"
                  type={showPassword ? "text" : "password"}
                >
                  <Label className="mb-1.5 text-sm font-semibold text-gray-800">
                    Password
                  </Label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <Input
                      type={showPassword ? "text" : "password"}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-11 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus-within:border-emerald-500 focus-within:bg-white"
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-emerald-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </TextField>
              </FieldGroup>

              {/* Sign In Button */}
              <Fieldset.Actions className="mt-6 w-full">
                <Button
                  type="submit"
                  isDisabled={loading || googleLoading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#10a88a] text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#059b7d] hover:shadow-lg"
                >
                  {loading ? "Signing In..." : "Sign In"}

                  {!loading && (
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs font-medium text-gray-400">
              OR CONTINUE WITH
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google Login */}
          {/* <Button
            type="button"
            onPress={handleGoogleLogin}
            isDisabled={loading || googleLoading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-emerald-300 hover:bg-gray-50"
          >
            <FcGoogle size={20} />

            {googleLoading ? "Connecting..." : "Continue with Google"}
          </Button> */}

          <button onClick={handleGoogleLogin}>Continue with Google</button>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Dont have an account?{" "}
            <Link href={"/sign-up"}>
              <button className="font-bold text-[#10a88a] transition-colors hover:text-emerald-700 hover:underline">
                Register here
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

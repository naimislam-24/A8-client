"use client";

import { signUp } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
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
  UserRound,
  Mail,
  Image as ImageIcon,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  X,
  Check,
} from "lucide-react";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordChecks = [
    {
      label: "At least one uppercase letter (A-Z)",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter (a-z)",
      valid: /[a-z]/.test(password),
    },
    {
      label: "Minimum 6 characters length",
      valid: password.length >= 6,
    },
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    try {
      setLoading(true);

      const { data: resData, error } = await signUp.email({
        name: data.name as string,
        image: (data.image as string) || undefined,
        email: data.email as string,
        password: data.password as string,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (resData) {
        toast.success("Account created successfully!");
        router.push("/");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10 dark:bg-[#080d19] sm:px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F766E] shadow-lg shadow-teal-500/20">
            <HeartHandshake
              size={27}
              className="text-white"
              strokeWidth={2.2}
            />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#1B3022] dark:text-white sm:text-4xl">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Join the community and start driving social change
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_40px_rgba(0,0,0,0.05)] dark:border-gray-700 dark:bg-[#11192c] sm:p-7">
          <Form className="w-full" onSubmit={onSubmit}>
            <Fieldset className="w-full">
              <FieldGroup className="gap-5">
                {/* Full Name */}
                <TextField
                  isRequired
                  name="name"
                  validate={(value) =>
                    value.trim().length < 3
                      ? "Name must be at least 3 characters"
                      : null
                  }
                >
                  <Label className="mb-1.5 text-sm font-semibold text-gray-800 dark:text-white">
                    Full Name
                  </Label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    />
                    <Input
                      className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus-within:border-[#0F766E] focus-within:bg-white dark:border-gray-700 dark:bg-[#080d19] dark:text-white dark:focus-within:bg-[#11192c]"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <FieldError />
                </TextField>

                {/* Email */}
                <TextField isRequired name="email" type="email">
                  <Label className="mb-1.5 text-sm font-semibold text-gray-800 dark:text-white">
                    Email Address
                  </Label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    />
                    <Input
                      className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus-within:border-[#0F766E] focus-within:bg-white dark:border-gray-700 dark:bg-[#080d19] dark:text-white dark:focus-within:bg-[#11192c]"
                      placeholder="name@example.com"
                    />
                  </div>
                  <FieldError />
                </TextField>

                {/* Profile Image */}
                <TextField name="image" type="url">
                  <Label className="mb-1.5 text-sm font-semibold text-gray-800 dark:text-white">
                    Profile Photo URL
                  </Label>

                  <div className="relative">
                    <ImageIcon
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    />
                    <Input
                      className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus-within:border-[#0F766E] focus-within:bg-white dark:border-gray-700 dark:bg-[#080d19] dark:text-white dark:focus-within:bg-[#11192c]"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <Description className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
                    Optional: Leave empty for default avatar
                  </Description>
                  <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                  isRequired
                  name="password"
                  minLength={6}
                  validate={(value) => {
                    if (!/[A-Z]/.test(value)) {
                      return "Password must contain an uppercase letter";
                    }
                    if (!/[a-z]/.test(value)) {
                      return "Password must contain a lowercase letter";
                    }
                    if (value.length < 6) {
                      return "Password must be at least 6 characters";
                    }
                    return null;
                  }}
                >
                  <Label className="mb-1.5 text-sm font-semibold text-gray-800 dark:text-white">
                    Password
                  </Label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    />

                    <Input
                      type={showPassword ? "text" : "password"}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-11 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus-within:border-[#0F766E] focus-within:bg-white dark:border-gray-700 dark:bg-[#080d19] dark:text-white dark:focus-within:bg-[#11192c]"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#0F766E] dark:text-gray-500 dark:hover:text-teal-400"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <FieldError />

                  {/* Password Requirements */}
                  <div className="mt-2 space-y-1">
                    {passwordChecks.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 text-xs"
                      >
                        {item.valid ? (
                          <Check
                            size={14}
                            className="text-[#0F766E] dark:text-teal-400"
                          />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}

                        <span
                          className={
                            item.valid
                              ? "text-[#0F766E] dark:text-teal-400"
                              : "text-gray-400 dark:text-gray-500"
                          }
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </TextField>
              </FieldGroup>

              {/* Register Button */}
              <Fieldset.Actions className="mt-6 w-full">
                <Button
                  type="submit"
                  isDisabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] text-sm font-bold text-white shadow-md shadow-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#115E59] hover:shadow-lg dark:bg-[#0F766E] dark:hover:bg-[#115E59]"
                >
                  {loading ? "Creating Account..." : "Register"}

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

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href={"/sign-in"}>
              <button className="font-bold text-[#0F766E] transition-colors hover:text-[#115E59] hover:underline dark:text-teal-400 dark:hover:text-teal-300">
                Login here
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

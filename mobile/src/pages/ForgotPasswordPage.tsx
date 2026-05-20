import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import {
  ForgotPasswordResetSchema,
  ForgotPasswordVerifySchema,
} from "@/lib/validation";
import { showToast } from "@/lib/show-toast";
import { StatusType } from "@/types";
import { Spinner } from "@/components/ui/spinner";

type ForgotPasswordVerifyResponse = {
  resetToken: string;
  message: string;
};

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verifyForm, setVerifyForm] = useState({ username: "", email: "" });
  const [resetForm, setResetForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleVerifyIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    const validated = ForgotPasswordVerifySchema.safeParse(verifyForm);
    if (!validated.success) {
      const firstError = Object.values(validated.error.flatten().fieldErrors).flat()[0];
      showToast(StatusType.ERROR, firstError ?? "Please check your details.");
      return;
    }

    const { fetcher } = api<ForgotPasswordVerifyResponse>("/auth/forgot-password/verify");
    setIsSubmitting(true);
    try {
      const res = await fetcher({
        method: "POST",
        payload: validated.data,
      });
      if (!res.success || !res.data?.resetToken) {
        showToast(StatusType.ERROR, res.message || "Identity verification failed.");
        return;
      }

      setResetToken(res.data.resetToken);
      setStep(2);
      showToast(
        StatusType.SUCCESS,
        res.data.message || "Identity verified. Enter your new password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const validated = ForgotPasswordResetSchema.safeParse(resetForm);
    if (!validated.success) {
      const firstError = Object.values(validated.error.flatten().fieldErrors).flat()[0];
      showToast(StatusType.ERROR, firstError ?? "Please check your new password.");
      return;
    }

    const { fetcher } = api<{ success: boolean; message: string }>(
      "/auth/forgot-password/reset",
    );
    setIsSubmitting(true);
    try {
      const res = await fetcher({
        method: "POST",
        payload: {
          resetToken,
          newPassword: validated.data.newPassword,
        },
      });
      if (!res.success) {
        showToast(StatusType.ERROR, res.message || "Failed to reset password.");
        return;
      }

      showToast(StatusType.SUCCESS, res.data?.message || "Password reset successful.");
      navigate("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 px-8 pt-16 pb-12 flex flex-col items-center text-white">
        <div className="bg-white/20 rounded-2xl p-3 mb-4">
          <Zap size={32} className="text-white" fill="white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Reset Password</h1>
        <p className="text-blue-100 text-sm mt-1 text-center">
          {step === 1
            ? "Verify your account with username and email"
            : "Create a new password for your account"}
        </p>
      </div>

      <div className="flex-1 px-6 pt-8 pb-6">
        {step === 1 ? (
          <form onSubmit={handleVerifyIdentity} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Username</label>
              <Input
                placeholder="@username"
                value={verifyForm.username}
                onChange={(e) =>
                  setVerifyForm((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={verifyForm.email}
                onChange={(e) =>
                  setVerifyForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : ""}Verify Identity
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={resetForm.newPassword}
                  onChange={(e) =>
                    setResetForm((prev) => ({ ...prev, newPassword: e.target.value }))
                  }
                  className="pr-11"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Confirm Password
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={resetForm.confirmPassword}
                onChange={(e) =>
                  setResetForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : ""}Update Password
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

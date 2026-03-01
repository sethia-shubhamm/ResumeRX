import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { identifier: "", password: "" } });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data.identifier, data.password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message ?? "Invalid credentials. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="w-100 px-3">
        <div className="text-center mb-4">
          <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-3">
            <img src="/logo/dark.svg" alt="ResumeRX" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "contain" }} />
            <span className="fw-bold text-white fs-5">ResumeRX</span>
          </Link>
        </div>

        <div className="auth-card mx-auto">
          <h4 className="fw-bold text-center mb-1">Sign in to your account</h4>
          <p className="text-center mb-4" style={{ color: "#94a3b8", fontSize: 14 }}>
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-decoration-none" style={{ color: "#818cf8" }}>
              Create one now →
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label className="form-label small fw-semibold" style={{ color: "#94a3b8" }}>
                Email or Username
              </label>
              <input
                type="text"
                className={`form-control form-control-dark ${errors.identifier ? "is-invalid" : ""}`}
                placeholder="you@example.com"
                {...register("identifier", { required: "Email or username is required" })}
              />
              {errors.identifier && (
                <div className="invalid-feedback">{errors.identifier.message}</div>
              )}
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between mb-1">
                <label className="form-label small fw-semibold mb-0" style={{ color: "#94a3b8" }}>
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="small text-decoration-none"
                  style={{ color: "#818cf8" }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control form-control-dark ${errors.password ? "is-invalid" : ""}`}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
                <button
                  type="button"
                  className="btn"
                  style={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    color: "#94a3b8",
                    borderLeft: "none",
                  }}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                </button>
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-brand w-100 py-2 fw-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <i className="bi bi-arrow-right ms-2" />
                </>
              )}
            </button>
          </form>

          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1" style={{ borderColor: "#334155" }} />
            <span className="mx-3 small" style={{ color: "#475569" }}>or continue with</span>
            <hr className="flex-grow-1" style={{ borderColor: "#334155" }} />
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary flex-fill d-flex align-items-center justify-content-center gap-2"
              onClick={() => toast("Google OAuth coming soon!")}
            >
              <i className="bi bi-google" />
              Google
            </button>
            <button
              className="btn btn-outline-secondary flex-fill d-flex align-items-center justify-content-center gap-2"
              onClick={() => toast("GitHub OAuth coming soon!")}
            >
              <i className="bi bi-github" />
              GitHub
            </button>
          </div>
        </div>

        <p className="text-center mt-4 small" style={{ color: "#475569" }}>
          <Link to="/" className="text-decoration-none" style={{ color: "#64748b" }}>
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

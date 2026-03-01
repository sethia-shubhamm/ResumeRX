import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function PostSignupScreen({ email }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-card mx-auto text-center">
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(79,70,229,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <i className="bi bi-envelope-check" style={{ fontSize: 28, color: "#4f46e5" }} />
        </div>
        <h4 className="fw-bold mb-2">Check your inbox!</h4>
        <p style={{ color: "#94a3b8" }}>
          We've sent a verification email to <strong className="text-white">{email}</strong>.
          Click the link to activate your account and start building your resume.
        </p>
        <Link to="/auth/login" className="btn btn-brand w-100 mt-3">
          Go to sign in
        </Link>
      </div>
    </div>
  );
}

export default function Register() {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { name: "", username: "", email: "", password: "" },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authRegister(data);
      setSubmittedEmail(data.email);
      setSubmitted(true);
      toast.success("Account created! Check your email.");
    } catch (err) {
      const msg = err?.response?.data?.message ?? "Registration failed. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) return <PostSignupScreen email={submittedEmail} />;

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
          <h4 className="fw-bold text-center mb-1">Create a new account</h4>
          <p className="text-center mb-4" style={{ color: "#94a3b8", fontSize: 14 }}>
            Already have an account?{" "}
            <Link to="/auth/login" className="text-decoration-none" style={{ color: "#818cf8" }}>
              Sign in now →
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label className="form-label small fw-semibold" style={{ color: "#94a3b8" }}>
                Full Name
              </label>
              <input
                type="text"
                className={`form-control form-control-dark ${errors.name ? "is-invalid" : ""}`}
                placeholder="Your full name"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                  maxLength: { value: 64, message: "Maximum 64 characters" },
                })}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold" style={{ color: "#94a3b8" }}>
                Username
              </label>
              <input
                type="text"
                className={`form-control form-control-dark ${errors.username ? "is-invalid" : ""}`}
                placeholder="your.username"
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                  pattern: {
                    value: /^[a-z0-9._-]+$/,
                    message: "Lowercase letters, numbers, dots, hyphens and underscores only",
                  },
                })}
              />
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold" style={{ color: "#94a3b8" }}>
                Email
              </label>
              <input
                type="email"
                className={`form-control form-control-dark ${errors.email ? "is-invalid" : ""}`}
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold" style={{ color: "#94a3b8" }}>
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control form-control-dark ${errors.password ? "is-invalid" : ""}`}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    maxLength: { value: 64, message: "Maximum 64 characters" },
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
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-4 small">
          <Link to="/" className="text-decoration-none" style={{ color: "#64748b" }}>
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import AuthShell from "@/components/zapex/AuthShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useZapex();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.email) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Provide a valid email";
    }
    if (!form.password) {
      nextErrors.password = "Password is required";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success("Welcome back! Redirecting...");
      router.push(user.role === "Admin" ? "/admin/dashboard" : "/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title='Sign in to ZapEx' subtitle='Use your ZapEx credentials to continue.'>
      <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
        <div>
          <label className='form-label'>Email address</label>
          <input
            type='email'
            name='email'
            className='form-control'
            placeholder='you@zapex.com'
            value={form.email}
            onChange={handleChange}
          />
          {errors.email ? <small className='text-danger'>{errors.email}</small> : null}
        </div>
        <div>
          <label className='form-label'>Password</label>
          <input
            type='password'
            name='password'
            className='form-control'
            placeholder='••••••••'
            value={form.password}
            onChange={handleChange}
          />
          {errors.password ? <small className='text-danger'>{errors.password}</small> : null}
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='remember'
              name='remember'
              checked={form.remember}
              onChange={handleChange}
            />
            <label htmlFor='remember' className='form-check-label'>
              Remember me
            </label>
          </div>
          <Link href='/auth/forgot-password' className='text-primary-600 fw-medium'>
            Forgot password?
          </Link>
        </div>
        <button type='submit' className='btn btn-primary w-100' disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p className='text-center text-muted mb-0'>
          Don’t have an account? <Link href='/auth/register'>Sign up</Link>
        </p>
      </form>
    </AuthShell>
  );
};

export default LoginPage;

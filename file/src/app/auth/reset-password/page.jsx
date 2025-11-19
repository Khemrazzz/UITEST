"use client";

import AuthShell from "@/components/zapex/AuthShell";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      nextErrors.password = "Use 8+ chars with upper, lower, digit & symbol";
    }
    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords must match";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("Password reset successful. Please log in.");
    router.push("/auth/login");
  };

  return (
    <AuthShell title='Reset your password' subtitle='Set a strong password to continue.'>
      <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
        <div>
          <label className='form-label'>New password</label>
          <input
            type='password'
            name='password'
            className='form-control'
            value={form.password}
            onChange={handleChange}
          />
          {errors.password ? <small className='text-danger'>{errors.password}</small> : null}
        </div>
        <div>
          <label className='form-label'>Confirm new password</label>
          <input
            type='password'
            name='confirmPassword'
            className='form-control'
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword ? <small className='text-danger'>{errors.confirmPassword}</small> : null}
        </div>
        <button type='submit' className='btn btn-primary w-100' disabled={loading}>
          {loading ? "Updating..." : "Reset password"}
        </button>
      </form>
    </AuthShell>
  );
};

export default ResetPasswordPage;

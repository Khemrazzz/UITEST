"use client";

import AuthShell from "@/components/zapex/AuthShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const router = useRouter();
  const { register } = useZapex();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.firstName) nextErrors.firstName = "First name is required";
    if (!form.lastName) nextErrors.lastName = "Last name is required";
    if (!form.email) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Invalid email";
    }
    if (!form.phone || form.phone.length < 8) {
      nextErrors.phone = "Enter a valid phone";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      nextErrors.password = "Use 8+ chars with upper, lower, digit & symbol";
    }
    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords must match";
    }
    if (!form.acceptTerms) {
      nextErrors.acceptTerms = "Accept the terms to continue";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await register(form);
    toast.success("Account created. Please verify your email.");
    router.push("/auth/verify-email");
  };

  return (
    <AuthShell title='Create your ZapEx account' subtitle='Kick off the Sepolia testnet experience.'>
      <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
        <div className='row g-3'>
          <div className='col-12 col-sm-6'>
            <label className='form-label'>First name</label>
            <input
              name='firstName'
              className='form-control'
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName ? <small className='text-danger'>{errors.firstName}</small> : null}
          </div>
          <div className='col-12 col-sm-6'>
            <label className='form-label'>Last name</label>
            <input
              name='lastName'
              className='form-control'
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName ? <small className='text-danger'>{errors.lastName}</small> : null}
          </div>
        </div>
        <div>
          <label className='form-label'>Email address</label>
          <input
            type='email'
            name='email'
            className='form-control'
            value={form.email}
            onChange={handleChange}
          />
          {errors.email ? <small className='text-danger'>{errors.email}</small> : null}
        </div>
        <div>
          <label className='form-label'>Phone number</label>
          <input
            name='phone'
            className='form-control'
            placeholder='+23050000000'
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone ? <small className='text-danger'>{errors.phone}</small> : null}
        </div>
        <div>
          <label className='form-label'>Password</label>
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
          <label className='form-label'>Confirm password</label>
          <input
            type='password'
            name='confirmPassword'
            className='form-control'
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword ? <small className='text-danger'>{errors.confirmPassword}</small> : null}
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            id='terms'
            name='acceptTerms'
            checked={form.acceptTerms}
            onChange={handleChange}
          />
          <label htmlFor='terms' className='form-check-label'>
            I accept the Terms and Conditions
          </label>
          {errors.acceptTerms ? <small className='text-danger d-block'>{errors.acceptTerms}</small> : null}
        </div>
        <button type='submit' className='btn btn-primary w-100' disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>
        <p className='text-center text-muted mb-0'>
          Already have an account? <Link href='/auth/login'>Sign in</Link>
        </p>
      </form>
    </AuthShell>
  );
};

export default RegisterPage;

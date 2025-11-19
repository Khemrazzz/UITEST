"use client";

import AuthShell from "@/components/zapex/AuthShell";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    toast.success("If an account exists, a reset link has been sent.");
  };

  return (
    <AuthShell title='Forgot password?' subtitle='We will send you reset instructions.'>
      <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
        <div>
          <label className='form-label'>Email address</label>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {error ? <small className='text-danger'>{error}</small> : null}
        </div>
        <button type='submit' className='btn btn-primary w-100' disabled={loading}>
          {loading ? "Sending..." : "Send reset link"}
        </button>
        <Link href='/auth/login' className='text-center'>
          Back to login
        </Link>
      </form>
    </AuthShell>
  );
};

export default ForgotPasswordPage;

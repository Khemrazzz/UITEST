"use client";

import AuthShell from "@/components/zapex/AuthShell";
import Link from "next/link";

const VerifyEmailPage = () => {
  return (
    <AuthShell title='Verify your email' subtitle='A verification link was sent to your inbox.'>
      <div className='text-center d-flex flex-column gap-3'>
        <p className='text-muted'>
          Check your inbox and click on the verification link to activate your ZapEx account. Once verified, you will be able to
          access the dashboard and complete KYC.
        </p>
        <Link href='/auth/login' className='btn btn-primary w-100'>
          Back to login
        </Link>
      </div>
    </AuthShell>
  );
};

export default VerifyEmailPage;

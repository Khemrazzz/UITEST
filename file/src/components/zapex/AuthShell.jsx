"use client";

import Link from "next/link";

const AuthShell = ({ title, subtitle, children }) => {
  return (
    <div className='auth-wrapper min-vh-100 d-flex align-items-center justify-content-center bg-light'>
      <div className='card shadow-lg border-0 w-100' style={{ maxWidth: 460 }}>
        <div className='card-body p-4 p-md-5'>
          <div className='text-center mb-4'>
            <Link href='/'>
              <img src='/assets/images/logo.png' alt='ZapEx' className='mb-3' style={{ height: 48 }} />
            </Link>
            <h4 className='mb-1'>{title}</h4>
            {subtitle ? <p className='text-muted mb-0'>{subtitle}</p> : null}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthShell;

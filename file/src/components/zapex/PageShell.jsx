"use client";

import MasterLayout from "@/masterLayout/MasterLayout";
import Link from "next/link";

const PageShell = ({ title, subtitle, breadcrumb = [], children, actions }) => {
  return (
    <MasterLayout>
      <div className='px-24 py-24'>
        <div className='d-flex flex-wrap justify-content-between gap-3 align-items-start mb-24'>
          <div>
            <p className='text-uppercase text-muted small mb-1'>ZapEx</p>
            <h4 className='mb-1'>{title}</h4>
            {subtitle ? <p className='text-muted mb-0'>{subtitle}</p> : null}
          </div>
          {actions?.length ? (
            <div className='d-flex flex-wrap gap-2'>{actions}</div>
          ) : null}
        </div>
        {breadcrumb.length ? (
          <ul className='breadcrumb-style-two d-flex align-items-center gap-2 mb-24'>
            <li>
              <Link href='/' className='text-primary-600 fw-medium'>
                Home
              </Link>
            </li>
            {breadcrumb.map((item) => (
              <li key={item.href ?? item.label} className='d-flex align-items-center gap-2'>
                <span>/</span>
                {item.href ? (
                  <Link href={item.href} className='text-dark-400'>
                    {item.label}
                  </Link>
                ) : (
                  <span className='fw-semibold'>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        ) : null}
        {children}
      </div>
    </MasterLayout>
  );
};

export default PageShell;

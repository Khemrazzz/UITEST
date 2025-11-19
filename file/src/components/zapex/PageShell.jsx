"use client";

import MasterLayout from "@/masterLayout/MasterLayout";
import Link from "next/link";

const PageShell = ({ title, subtitle, breadcrumb = [], children, actions }) => {
  return (
    <MasterLayout>
      <div className='mb-24'>
        <div className='row g-3 align-items-center justify-content-between'>
          <div className='col'>
            <p className='text-uppercase text-muted small mb-1 mb-sm-0'>ZapEx</p>
            <h4 className='mb-1'>{title}</h4>
            {subtitle ? <p className='text-muted mb-0'>{subtitle}</p> : null}
          </div>
          {actions?.length ? (
            <div className='col-12 col-lg-auto d-flex flex-wrap gap-2'>
              {actions}
            </div>
          ) : null}
        </div>
        {breadcrumb.length ? (
          <ul className='breadcrumb-style-two d-flex flex-wrap align-items-center gap-2 mt-3 mb-0'>
            <li>
              <Link href='/' className='text-primary-600 fw-medium'>
                Home
              </Link>
            </li>
            {breadcrumb.map((item) => (
              <li
                key={item.href ?? item.label}
                className='d-flex align-items-center gap-2 text-capitalize'
              >
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
      </div>
      {children}
    </MasterLayout>
  );
};

export default PageShell;

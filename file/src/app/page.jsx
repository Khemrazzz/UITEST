import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import Link from "next/link";

export const metadata = {
  title: "WowDash NEXT JS - Admin Dashboard Multipurpose Bootstrap 5 Template",
  description:
    "Wowdash NEXT JS is a developer-friendly, ready-to-use admin template designed for building attractive, scalable, and high-performing web applications.",
};

const Page = () => {
  return (
    <MasterLayout>
      <Breadcrumb title='Welcome' />
      <div className='row g-3'>
        <div className='col-xxl-8'>
          <div className='card h-100'>
            <div className='card-body'>
              <div className='d-flex align-items-center justify-content-between gap-3 flex-wrap'>
                <div>
                  <p className='text-primary-600 fw-semibold mb-1'>WowDash Template</p>
                  <h5 className='mb-2'>Select a workspace to explore</h5>
                  <p className='text-secondary-600 mb-0'>
                    Open the ZapEx simulator or continue using the bundled dashboards without changing the base layout.
                  </p>
                </div>
                <div className='d-flex flex-wrap gap-2'>
                  <Link className='btn btn-primary' href='/zapex'>
                    Go to ZapEx Flow
                  </Link>
                  <Link className='btn btn-outline-secondary' href='/index-4'>
                    Crypto Dashboard
                  </Link>
                  <Link className='btn btn-outline-secondary' href='/index-6'>
                    LMS Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xxl-4'>
          <div className='card h-100'>
            <div className='card-body'>
              <h6 className='mb-3'>Quick Links</h6>
              <ul className='list-unstyled mb-0 d-grid gap-2'>
                <li>
                  <Link href='/dashboard' className='d-flex align-items-center gap-2 text-primary-600'>
                    <i className='ri-arrow-right-up-line' /> ZapEx User Dashboard
                  </Link>
                </li>
                <li>
                  <Link href='/wallets' className='d-flex align-items-center gap-2 text-primary-600'>
                    <i className='ri-arrow-right-up-line' /> ZapEx Wallets
                  </Link>
                </li>
                <li>
                  <Link href='/admin/dashboard' className='d-flex align-items-center gap-2 text-primary-600'>
                    <i className='ri-arrow-right-up-line' /> ZapEx Admin Console
                  </Link>
                </li>
                <li>
                  <Link href='/index-2' className='d-flex align-items-center gap-2 text-primary-600'>
                    <i className='ri-arrow-right-up-line' /> CRM Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default Page;

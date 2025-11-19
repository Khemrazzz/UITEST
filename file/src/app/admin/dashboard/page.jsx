"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";

const AdminDashboardPage = () => {
  const { users, kycQueue, trades, payments } = useZapex();
  const stats = [
    { label: "Total users", value: users.length },
    { label: "Pending KYC", value: kycQueue.filter((item) => item.status === "Pending").length },
    { label: "Total trades", value: trades.length },
    { label: "Deposits today", value: payments.deposits.length },
  ];

  return (
    <PageShell title='Admin Dashboard' subtitle='Monitor ZapEx at a glance.' breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Overview" }]}> 
      <div className='row g-3 mb-24'>
        {stats.map((stat) => (
          <div className='col-12 col-sm-6 col-xl-3' key={stat.label}>
            <div className='card'>
              <div className='card-body'>
                <p className='text-muted mb-1'>{stat.label}</p>
                <h4 className='mb-0'>{stat.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='row g-3'>
        <div className='col-12 col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Recent Signups</h6>
            </div>
            <div className='table-responsive'>
              <table className='table align-middle'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(-4).map((user) => (
                    <tr key={user.id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`badge text-bg-${user.isActive ? "success" : "danger"}`}>
                          {user.isActive ? "Active" : "Suspended"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Latest KYC submissions</h6>
            </div>
            <div className='table-responsive'>
              <table className='table align-middle'>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Document</th>
                    <th>Country</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {kycQueue.slice(0, 4).map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.name}</td>
                      <td>{entry.documentType}</td>
                      <td>{entry.country}</td>
                      <td>{entry.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminDashboardPage;

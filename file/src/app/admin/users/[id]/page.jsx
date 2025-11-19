"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";

const AdminUserDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { users, wallets, kycQueue, auditLogs, toggleUserStatus } = useZapex();
  const user = users.find((entry) => entry.id === (Array.isArray(id) ? id[0] : id));

  const userWallets = useMemo(() => wallets.filter((wallet) => wallet.userId === user?.id), [wallets, user]);
  const kycProfile = kycQueue.find((entry) => entry.user === user?.email);
  const userLogs = auditLogs.filter((log) => log.user === user?.email);

  if (!user) {
    return (
      <PageShell title='User not found' breadcrumb={[{ label: "Admin", href: "/admin/users" }, { label: "User" }]}> 
        <div className='card'>
          <div className='card-body'>
            <p>User not found.</p>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={user.firstName + " " + user.lastName} subtitle={user.email} breadcrumb={[{ label: "Admin", href: "/admin/users" }, { label: user.firstName }]}> 
      <div className='card mb-3'>
        <div className='card-body d-flex flex-wrap justify-content-between align-items-center gap-3'>
          <div>
            <p className='mb-1'>Role: {user.role}</p>
            <p className='mb-1'>KYC: {user.kycStatus}</p>
            <p className='mb-0'>Status: {user.isActive ? "Active" : "Suspended"}</p>
          </div>
          <div className='d-flex gap-2'>
            <button className='btn btn-outline-danger btn-sm' onClick={() => {toggleUserStatus(user.id); toast.info("Status updated");}}>
              {user.isActive ? "Suspend" : "Reactivate"}
            </button>
            <button className='btn btn-outline-primary btn-sm' onClick={() => toast.success("Reset email sent")}>Reset password</button>
            <button className='btn btn-light btn-sm' onClick={() => router.back()}>Back</button>
          </div>
        </div>
      </div>
      <div className='row g-3'>
        <div className='col-12 col-xl-4'>
          <div className='card h-100'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Profile</h6>
            </div>
            <div className='card-body'>
              <p className='mb-1'>Phone: {user.phone}</p>
              <p className='mb-1'>Last login: {user.lastLogin}</p>
              <p className='mb-0'>Role: {user.role}</p>
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-4'>
          <div className='card h-100'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Wallets</h6>
            </div>
            <div className='card-body'>
              {userWallets.length ? (
                <ul className='list-unstyled mb-0'>
                  {userWallets.map((wallet) => (
                    <li key={wallet.id} className='d-flex justify-content-between mb-2'>
                      <span>{wallet.asset}</span>
                      <strong>{wallet.balance}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-muted mb-0'>No wallets assigned.</p>
              )}
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-4'>
          <div className='card h-100'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>KYC</h6>
            </div>
            <div className='card-body'>
              {kycProfile ? (
                <>
                  <p className='mb-1'>Document: {kycProfile.documentType}</p>
                  <p className='mb-1'>Country: {kycProfile.country}</p>
                  <p className='mb-0'>Status: {kycProfile.status}</p>
                </>
              ) : (
                <p className='text-muted mb-0'>No submission.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='card mt-3'>
        <div className='card-header border-0'>
          <h6 className='mb-0'>Activity</h6>
        </div>
        <div className='table-responsive'>
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {userLogs.map((log) => (
                <tr key={log.id}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.action}</td>
                  <td>{log.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminUserDetailPage;

"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import Link from "next/link";
import { useMemo, useState } from "react";

const AdminKycQueuePage = () => {
  const { kycQueue } = useZapex();
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = useMemo(() => {
    return kycQueue.filter((entry) => (statusFilter === "all" ? true : entry.status === statusFilter));
  }, [kycQueue, statusFilter]);

  return (
    <PageShell title='KYC Queue' subtitle='Review submissions across the platform.' breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "KYC" }]}> 
      <div className='card mb-3'>
        <div className='card-body'>
          <select className='form-select w-auto' value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value='all'>All</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Verified</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>
      <div className='card'>
        <div className='table-responsive'>
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Document</th>
                <th>Country</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr key={entry.id}>
                  <td>{new Date(entry.submittedAt).toLocaleString()}</td>
                  <td>{entry.user}</td>
                  <td>{entry.documentType}</td>
                  <td>{entry.country}</td>
                  <td>{entry.status}</td>
                  <td>
                    <Link href={`/admin/kyc/${entry.id}`} className='btn btn-sm btn-primary'>Review</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminKycQueuePage;

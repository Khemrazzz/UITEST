"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import { useState } from "react";

const AdminPaymentsPage = () => {
  const { payments } = useZapex();
  const [tab, setTab] = useState("deposits");

  const rows = tab === "deposits" ? payments.deposits : payments.withdrawals;

  return (
    <PageShell title='Payments' subtitle='Track deposits & withdrawals.' breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Payments" }]}> 
      <div className='card'>
        <div className='card-header border-0 d-flex gap-2'>
          <button className={`btn btn-sm ${tab === "deposits" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setTab("deposits")}>Deposits</button>
          <button className={`btn btn-sm ${tab === "withdrawals" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setTab("withdrawals")}>Withdrawals</button>
        </div>
        <div className='table-responsive'>
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Asset</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{new Date(row.time).toLocaleString()}</td>
                  <td>{row.user}</td>
                  <td>{row.asset}</td>
                  <td>{row.amount}</td>
                  <td>{row.status}</td>
                  <td>{row.reference ?? row.txHash ?? row.destination}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminPaymentsPage;

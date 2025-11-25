"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import { useMemo, useState } from "react";

const AdminAuditPage = () => {
  const { auditLogs } = useZapex();
  const [action, setAction] = useState("all");
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    return auditLogs
      .filter((row) => (action === "all" ? true : row.action === action))
      .filter((row) => row.user.toLowerCase().includes(search.toLowerCase()));
  }, [auditLogs, action, search]);

  const actions = Array.from(new Set(auditLogs.map((row) => row.action)));

  return (
    <PageShell title='Audit Logs' subtitle='Immutable record of sensitive actions.' breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Audit" }]}> 
      <div className='card mb-3'>
        <div className='card-body d-flex flex-wrap gap-3'>
          <select className='form-select w-auto' value={action} onChange={(event) => setAction(event.target.value)}>
            <option value='all'>All actions</option>
            {actions.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <input className='form-control' placeholder='Search email' value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
      </div>
      <div className='card'>
        <div className='table-responsive'>
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Action</th>
                <th>Description</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{new Date(row.timestamp).toLocaleString()}</td>
                  <td>{row.user}</td>
                  <td>{row.action}</td>
                  <td>{row.description}</td>
                  <td>{row.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminAuditPage;

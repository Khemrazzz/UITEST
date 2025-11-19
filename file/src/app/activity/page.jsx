"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import { useMemo, useState } from "react";

const ActivityPage = () => {
  const { auditLogs, currentUser } = useZapex();
  const [actionFilter, setActionFilter] = useState("all");
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    return auditLogs
      .filter((row) => row.user === currentUser?.email)
      .filter((row) => (actionFilter === "all" ? true : row.action === actionFilter))
      .filter((row) => row.description.toLowerCase().includes(search.toLowerCase()));
  }, [auditLogs, currentUser, actionFilter, search]);

  const uniqueActions = Array.from(new Set(auditLogs.map((row) => row.action)));

  return (
    <PageShell title='Activity Log' subtitle='See every sensitive action associated with your account.' breadcrumb={[{ label: "Activity" }]}> 
      <div className='card mb-3'>
        <div className='card-body d-flex flex-wrap gap-3'>
          <select className='form-select w-auto' value={actionFilter} onChange={(event) => setActionFilter(event.target.value)}>
            <option value='all'>All actions</option>
            {uniqueActions.map((action) => (
              <option key={action}>{action}</option>
            ))}
          </select>
          <input
            className='form-control'
            placeholder='Search description'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <div className='card'>
        <div className='table-responsive'>
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Description</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{new Date(row.timestamp).toLocaleString()}</td>
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

export default ActivityPage;

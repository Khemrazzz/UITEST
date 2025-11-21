"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import Link from "next/link";
import { useMemo, useState } from "react";

const AdminUsersPage = () => {
  const { users, setUserRole, toggleUserStatus } = useZapex();
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [kycFilter, setKycFilter] = useState("all");

  const filtered = useMemo(() => {
    return users
      .filter((user) => user.email.toLowerCase().includes(query.toLowerCase()) || user.firstName.toLowerCase().includes(query.toLowerCase()))
      .filter((user) => (roleFilter === "all" ? true : user.role === roleFilter))
      .filter((user) => (kycFilter === "all" ? true : user.kycStatus === kycFilter));
  }, [users, query, roleFilter, kycFilter]);

  return (
    <PageShell title='User Management' subtitle='Control every account.' breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Users" }]}> 
      <div className='card mb-3'>
        <div className='card-body d-flex flex-wrap gap-3'>
          <input className='form-control' placeholder='Search user' value={query} onChange={(event) => setQuery(event.target.value)} />
          <select className='form-select w-auto' value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
            <option value='all'>All roles</option>
            <option>User</option>
            <option>Admin</option>
            <option>Compliance</option>
          </select>
          <select className='form-select w-auto' value={kycFilter} onChange={(event) => setKycFilter(event.target.value)}>
            <option value='all'>All KYC statuses</option>
            <option>Pending</option>
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
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>KYC</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <select className='form-select form-select-sm' value={user.role} onChange={(event) => setUserRole(user.id, event.target.value)}>
                      <option>User</option>
                      <option>Admin</option>
                      <option>Compliance</option>
                    </select>
                  </td>
                  <td>{user.kycStatus}</td>
                  <td>
                    <span className={`badge text-bg-${user.isActive ? "success" : "danger"}`}>
                      {user.isActive ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className='d-flex gap-2'>
                    <Link href={`/admin/users/${user.id}`} className='btn btn-sm btn-light'>View</Link>
                    <button className='btn btn-sm btn-outline-danger' onClick={() => toggleUserStatus(user.id)}>
                      {user.isActive ? "Suspend" : "Activate"}
                    </button>
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

export default AdminUsersPage;

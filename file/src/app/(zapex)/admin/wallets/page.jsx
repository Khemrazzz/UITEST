"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import Link from "next/link";

const AdminWalletsPage = () => {
  const { wallets, users } = useZapex();

  const withOwners = wallets.map((wallet) => ({
    ...wallet,
    owner: users.find((user) => user.id === wallet.userId)?.email ?? "user@zapex.com",
  }));

  return (
    <PageShell title='Wallet Monitor' subtitle='Review balances across users.' breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Wallets" }]}> 
      <div className='card'>
        <div className='table-responsive'>
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>User</th>
                <th>Asset</th>
                <th>Balance</th>
                <th>Locked</th>
                <th>Network</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {withOwners.map((wallet) => (
                <tr key={wallet.id}>
                  <td>{wallet.owner}</td>
                  <td>{wallet.asset}</td>
                  <td>{wallet.balance}</td>
                  <td>{wallet.locked}</td>
                  <td>{wallet.network}</td>
                  <td>
                    <Link href={`/admin/users/${wallet.userId}`} className='btn btn-sm btn-light'>View user</Link>
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

export default AdminWalletsPage;

"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import Link from "next/link";
import { useMemo, useState } from "react";

const WalletsPage = () => {
  const { wallets } = useZapex();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return wallets.filter((wallet) =>
      wallet.asset.toLowerCase().includes(query.toLowerCase())
    );
  }, [wallets, query]);

  return (
    <PageShell
      title='My Wallets'
      subtitle='Monitor balances, locked funds and launch wallet actions.'
      breadcrumb={[{ label: "Wallets" }]}
    >
      <div className='card mb-3'>
        <div className='card-body d-flex flex-wrap gap-3 justify-content-between'>
          <input
            className='form-control'
            placeholder='Search by symbol'
            style={{ maxWidth: 320 }}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Link href='/wallets/ETH' className='btn btn-outline-primary btn-sm'>
            View ETH wallet
          </Link>
        </div>
      </div>
      <div className='card'>
        <div className='table-responsive'>
          <table className='table table-hover align-middle'>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Balance</th>
                <th>Locked</th>
                <th>Network</th>
                <th>Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((wallet) => (
                <tr key={wallet.id}>
                  <td className='fw-semibold'>{wallet.asset}</td>
                  <td>{wallet.balance}</td>
                  <td>{wallet.locked}</td>
                  <td>{wallet.network}</td>
                  <td>≈ {(wallet.balance * 1000).toFixed(0)} MUR</td>
                  <td>
                    <Link href={`/wallets/${wallet.asset}`} className='btn btn-sm btn-light'>
                      View
                    </Link>
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

export default WalletsPage;

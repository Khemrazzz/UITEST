"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import Link from "next/link";

const MarketsPage = () => {
  const { markets } = useZapex();

  return (
    <PageShell title='Markets' subtitle='Simulated spot markets on Sepolia testnet.' breadcrumb={[{ label: "Trading", href: "/trading/orders" }, { label: "Markets" }]}> 
      <div className='card'>
        <div className='table-responsive'>
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Market</th>
                <th>Last price</th>
                <th>24h change</th>
                <th>24h volume</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {markets.map((market) => (
                <tr key={market.id}>
                  <td>{market.id}</td>
                  <td>{market.lastPrice.toLocaleString()}</td>
                  <td className={market.change >= 0 ? "text-success" : "text-danger"}>{market.change}%</td>
                  <td>{market.volume}</td>
                  <td>
                    <span className={`badge text-bg-${market.status === "Active" ? "success" : "warning"}`}>{market.status}</span>
                  </td>
                  <td>
                    <Link href={`/trading/orders?market=${encodeURIComponent(market.id)}`} className='btn btn-sm btn-primary'>
                      Trade
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

export default MarketsPage;

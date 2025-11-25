"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";

const AdminTradesPage = () => {
  const { trades } = useZapex();

  return (
    <PageShell title='All Trades' subtitle='Network-wide fills.' breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Trades" }]}> 
      <div className='card'>
        <div className='table-responsive'>
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Time</th>
                <th>Market</th>
                <th>Side</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Fee</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id}>
                  <td>{new Date(trade.timestamp).toLocaleString()}</td>
                  <td>{trade.market}</td>
                  <td>
                    <span className={`badge text-bg-${trade.side === "Buy" ? "success" : "danger"}`}>{trade.side}</span>
                  </td>
                  <td>{trade.price.toLocaleString()}</td>
                  <td>{trade.quantity}</td>
                  <td>{trade.fee}</td>
                  <td>{trade.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminTradesPage;

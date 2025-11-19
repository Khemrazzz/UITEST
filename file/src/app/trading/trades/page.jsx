"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import { useMemo, useState } from "react";

const TradesPage = () => {
  const { trades } = useZapex();
  const [market, setMarket] = useState("all");

  const rows = useMemo(() => {
    return trades.filter((trade) => (market === "all" ? true : trade.market === market));
  }, [trades, market]);

  const markets = Array.from(new Set(trades.map((trade) => trade.market)));

  return (
    <PageShell title='Trade History' subtitle='Executed fills from the matching engine.' breadcrumb={[{ label: "Trading", href: "/trading/markets" }, { label: "Trades" }]}> 
      <div className='card mb-3'>
        <div className='card-body'>
          <select className='form-select w-auto' value={market} onChange={(event) => setMarket(event.target.value)}>
            <option value='all'>All markets</option>
            {markets.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>
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
              {rows.map((trade) => (
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

export default TradesPage;

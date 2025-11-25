"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const WalletDetailPage = () => {
  const { asset } = useParams();
  const symbol = Array.isArray(asset) ? asset[0] : asset;
  const { wallets, transactions, recordTransaction } = useZapex();
  const wallet = wallets.find((item) => item.asset.toLowerCase() === symbol.toLowerCase());
  const walletTransactions = useMemo(
    () => transactions.filter((tx) => tx.asset.toLowerCase() === symbol.toLowerCase()),
    [transactions, symbol]
  );
  const [transferMode, setTransferMode] = useState("internal");
  const [form, setForm] = useState({ to: "", address: "", amount: "", network: "Ethereum Sepolia" });

  if (!wallet) {
    return (
      <PageShell title='Wallet not found' breadcrumb={[{ label: "Wallets", href: "/wallets" }, { label: symbol }]}> 
        <div className='card'>
          <div className='card-body'>
            <p className='mb-0'>No wallet configured for {symbol}.</p>
          </div>
        </div>
      </PageShell>
    );
  }

  const handleTransfer = async (event) => {
    event.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (transferMode === "internal" && !form.to) {
      toast.error("Recipient email is required");
      return;
    }
    if (transferMode === "external" && !form.address) {
      toast.error("Destination address is required");
      return;
    }
    recordTransaction({
      walletId: wallet.id,
      type: transferMode === "internal" ? "Internal Transfer" : "On-chain Transfer",
      asset: wallet.asset,
      amount: Number(form.amount),
      status: "Pending",
    });
    toast.success("Transfer created");
    setForm({ to: "", address: "", amount: "", network: "Ethereum Sepolia" });
  };

  return (
    <PageShell
      title={`${wallet.asset} Wallet`}
      subtitle='Deposit, withdraw or transfer this asset.'
      breadcrumb={[{ label: "Wallets", href: "/wallets" }, { label: wallet.asset }]}
    >
      <div className='row g-3 mb-24'>
        <div className='col-12 col-xl-4'>
          <div className='card h-100'>
            <div className='card-body'>
              <div className='d-flex justify-content-between mb-2'>
                <span className='text-muted'>Balance</span>
                <strong>{wallet.balance}</strong>
              </div>
              <div className='d-flex justify-content-between mb-2'>
                <span className='text-muted'>Locked</span>
                <strong>{wallet.locked}</strong>
              </div>
              <div className='d-flex justify-content-between mb-2'>
                <span className='text-muted'>Network</span>
                <strong>{wallet.network}</strong>
              </div>
              <div className='d-flex gap-2'>
                <button className='btn btn-outline-primary btn-sm flex-grow-1'>Deposit</button>
                <button className='btn btn-outline-secondary btn-sm flex-grow-1'>Withdraw</button>
                <button className='btn btn-primary btn-sm flex-grow-1'>Transfer</button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-8'>
          <div className='card h-100'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Transfer Funds</h6>
            </div>
            <div className='card-body'>
              <form className='d-flex flex-column gap-3' onSubmit={handleTransfer}>
                <div className='d-flex gap-3 flex-wrap'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      id='internal'
                      checked={transferMode === "internal"}
                      onChange={() => setTransferMode("internal")}
                    />
                    <label className='form-check-label' htmlFor='internal'>
                      Internal ZapEx Transfer
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      id='external'
                      checked={transferMode === "external"}
                      onChange={() => setTransferMode("external")}
                    />
                    <label className='form-check-label' htmlFor='external'>
                      External blockchain
                    </label>
                  </div>
                </div>
                {transferMode === "internal" ? (
                  <div>
                    <label className='form-label'>Recipient email / user ID</label>
                    <input
                      className='form-control'
                      value={form.to}
                      onChange={(event) => setForm((prev) => ({ ...prev, to: event.target.value }))}
                      placeholder='friend@zapex.com'
                    />
                  </div>
                ) : (
                  <div>
                    <label className='form-label'>Destination address</label>
                    <input
                      className='form-control'
                      value={form.address}
                      onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                      placeholder='0x...'
                    />
                  </div>
                )}
                <div>
                  <label className='form-label'>Amount</label>
                  <input
                    className='form-control'
                    type='number'
                    value={form.amount}
                    onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
                  />
                </div>
                {transferMode === "external" ? (
                  <div>
                    <label className='form-label'>Network</label>
                    <select
                      className='form-select'
                      value={form.network}
                      onChange={(event) => setForm((prev) => ({ ...prev, network: event.target.value }))}
                    >
                      <option>Ethereum Sepolia</option>
                      <option>Polygon zkEVM Testnet</option>
                    </select>
                    <small className='text-muted'>Simulated gas fee: 0.00021 ETH</small>
                  </div>
                ) : null}
                <button type='submit' className='btn btn-primary'>
                  Submit transfer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='card'>
        <div className='card-header border-0'>
          <h6 className='mb-0'>Transactions</h6>
        </div>
        <div className='table-responsive'>
          <table className='table table-striped align-middle'>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {walletTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.type}</td>
                  <td>{tx.amount}</td>
                  <td>{tx.status}</td>
                  <td>{new Date(tx.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
};

export default WalletDetailPage;

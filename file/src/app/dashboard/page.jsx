"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import Link from "next/link";

const DashboardPage = () => {
  const { currentUser, wallets, transactions, orders, auditLogs } = useZapex();
  const totalValue = wallets.reduce((sum, wallet) => sum + Number(wallet.balance || 0), 0);
  const lastLogin = currentUser?.lastLogin ? new Date(currentUser.lastLogin).toLocaleString() : "--";
  const kycStatus = currentUser?.kycStatus ?? "Pending";
  const recentActivity = auditLogs.slice(0, 5);

  const portfolioSlices = wallets.map((wallet) => ({
    label: wallet.asset,
    percent: Math.round((wallet.balance / totalValue) * 100) || 0,
  }));

  return (
    <PageShell
      title='Dashboard'
      subtitle={`Welcome back, ${currentUser?.firstName ?? "ZapEx user"}`}
      breadcrumb={[{ label: "Dashboard" }]}
      actions={[
        <Link key='wallets' href='/wallets' className='btn btn-outline-primary btn-sm'>
          Go to Wallets
        </Link>,
        kycStatus !== "Verified" ? (
          <Link key='kyc' href='/kyc/submit' className='btn btn-primary btn-sm'>
            Complete KYC
          </Link>
        ) : null,
      ].filter(Boolean)}
    >
      <div className='row g-3 mb-24'>
        <div className='col-12 col-md-3'>
          <StatCard label='Total Portfolio Value' value={`${totalValue.toFixed(2)} units`} accent='primary' />
        </div>
        <div className='col-12 col-md-3'>
          <StatCard label='Wallets' value={wallets.length} accent='info' />
        </div>
        <div className='col-12 col-md-3'>
          <StatCard label='Last Login' value={lastLogin} accent='warning' />
        </div>
        <div className='col-12 col-md-3'>
          <StatCard label='KYC Status' value={kycStatus} accent={kycStatus === "Verified" ? "success" : "danger"} />
        </div>
      </div>

      <div className='row g-3 mb-24'>
        <div className='col-12 col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Portfolio Allocation</h6>
            </div>
            <div className='card-body'>
              <div className='d-flex flex-column gap-3'>
                {portfolioSlices.map((slice) => (
                  <div key={slice.label}>
                    <div className='d-flex justify-content-between'>
                      <span className='fw-medium'>{slice.label}</span>
                      <span>{slice.percent}%</span>
                    </div>
                    <div className='progress' style={{ height: 6 }}>
                      <div className='progress-bar bg-primary' style={{ width: `${slice.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Recent Activity</h6>
            </div>
            <div className='card-body'>
              <ul className='timeline'>
                {recentActivity.map((activity) => (
                  <li key={activity.id} className='timeline-item'>
                    <span className='timeline-date'>
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                    <h6 className='mb-1'>{activity.action}</h6>
                    <p className='text-muted mb-0'>{activity.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='row g-3'>
        <div className='col-12 col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-0 d-flex justify-content-between'>
              <h6 className='mb-0'>Recent Transactions</h6>
              <Link href='/wallets' className='text-primary-600 text-sm'>
                View all
              </Link>
            </div>
            <div className='table-responsive'>
              <table className='table table-borderless align-middle'>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Asset</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.type}</td>
                      <td>{tx.asset}</td>
                      <td>{tx.amount}</td>
                      <td>
                        <span className={`badge text-bg-${tx.status === "Completed" ? "success" : tx.status === "Pending" ? "warning" : "secondary"}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td>{new Date(tx.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-0 d-flex justify-content-between'>
              <h6 className='mb-0'>Open Orders</h6>
              <Link href='/trading/orders' className='text-primary-600 text-sm'>
                Go to trading
              </Link>
            </div>
            <div className='table-responsive'>
              <table className='table table-borderless align-middle'>
                <thead>
                  <tr>
                    <th>Market</th>
                    <th>Side</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id}>
                      <td>{order.market}</td>
                      <td>
                        <span className={`badge text-bg-${order.side === "Buy" ? "success" : "danger"}`}>{order.side}</span>
                      </td>
                      <td>{order.price ? order.price.toLocaleString() : "Market"}</td>
                      <td>{order.quantity}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

const StatCard = ({ label, value, accent }) => (
  <div className='card'>
    <div className='card-body'>
      <p className='text-muted mb-1'>{label}</p>
      <h5 className={`mb-0 text-${accent}`}>{value}</h5>
    </div>
  </div>
);

export default DashboardPage;

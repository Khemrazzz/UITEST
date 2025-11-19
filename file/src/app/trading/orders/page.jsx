"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const searchParams = useSearchParams();
  const defaultMarket = searchParams.get("market") ?? "BTC/MUR";
  const { markets, orders, placeOrder, cancelOrder } = useZapex();
  const [form, setForm] = useState({
    market: defaultMarket,
    side: "Buy",
    type: "Limit",
    price: 0,
    quantity: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: name === "price" || name === "quantity" ? Number(value) : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.quantity || (form.type === "Limit" && !form.price)) {
      toast.error("Provide price and quantity");
      return;
    }
    placeOrder(form);
    toast.success("Order placed");
    setForm((prev) => ({ ...prev, price: 0, quantity: 0 }));
  };

  const estimatedTotal = form.type === "Market" ? form.quantity * 1000 : form.quantity * (form.price || 0);

  return (
    <PageShell title='Orders' subtitle='Place buy/sell orders with price-time matching.' breadcrumb={[{ label: "Trading", href: "/trading/markets" }, { label: "Orders" }]}> 
      <div className='row g-3'>
        <div className='col-12 col-xl-4'>
          <div className='card'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Order Form</h6>
            </div>
            <div className='card-body'>
              <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
                <div>
                  <label className='form-label'>Market</label>
                  <select className='form-select' name='market' value={form.market} onChange={handleChange}>
                    {markets.map((market) => (
                      <option key={market.id}>{market.id}</option>
                    ))}
                  </select>
                </div>
                <div className='d-flex gap-2'>
                  <select className='form-select' name='side' value={form.side} onChange={handleChange}>
                    <option>Buy</option>
                    <option>Sell</option>
                  </select>
                  <select className='form-select' name='type' value={form.type} onChange={handleChange}>
                    <option>Market</option>
                    <option>Limit</option>
                  </select>
                </div>
                {form.type === "Limit" ? (
                  <div>
                    <label className='form-label'>Price</label>
                    <input type='number' className='form-control' name='price' value={form.price} onChange={handleChange} />
                  </div>
                ) : null}
                <div>
                  <label className='form-label'>Quantity</label>
                  <input type='number' className='form-control' name='quantity' value={form.quantity} onChange={handleChange} />
                </div>
                <div className='d-flex justify-content-between text-muted'>
                  <span>Estimated total</span>
                  <strong>{estimatedTotal.toLocaleString()}</strong>
                </div>
                <button className='btn btn-primary' type='submit'>
                  Submit order
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-8'>
          <div className='card h-100'>
            <div className='card-header border-0 d-flex justify-content-between'>
              <h6 className='mb-0'>Open Orders</h6>
            </div>
            <div className='table-responsive'>
              <table className='table align-middle'>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Market</th>
                    <th>Side</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Filled</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{new Date(order.createdAt).toLocaleTimeString()}</td>
                      <td>{order.market}</td>
                      <td>
                        <span className={`badge text-bg-${order.side === "Buy" ? "success" : "danger"}`}>{order.side}</span>
                      </td>
                      <td>{order.type}</td>
                      <td>{order.price || "Market"}</td>
                      <td>{order.quantity}</td>
                      <td>{order.filled}</td>
                      <td>{order.status}</td>
                      <td>
                        {order.status === "Open" ? (
                          <button className='btn btn-link text-danger p-0' onClick={() => cancelOrder(order.id)}>
                            Cancel
                          </button>
                        ) : null}
                      </td>
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

export default OrdersPage;

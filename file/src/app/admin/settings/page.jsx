"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminSettingsPage = () => {
  const { settings, updateSettings } = useZapex();
  const [form, setForm] = useState(settings);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : Number(value) || value }));
  };

  const handleMinChange = (asset, value) => {
    setForm((prev) => ({ ...prev, minAmounts: { ...prev.minAmounts, [asset]: Number(value) } }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSettings(form);
    toast.success("Settings updated");
  };

  return (
    <PageShell title='System Settings' subtitle='Configure platform behaviour.' breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Settings" }]}> 
      <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
        <div className='card'>
          <div className='card-header border-0'>
            <h6 className='mb-0'>Trading Parameters</h6>
          </div>
          <div className='card-body row g-3'>
            <div className='col-12 col-md-4'>
              <label className='form-label'>Maker fee %</label>
              <input type='number' className='form-control' name='makerFee' value={form.makerFee} onChange={handleChange} />
            </div>
            <div className='col-12 col-md-4'>
              <label className='form-label'>Taker fee %</label>
              <input type='number' className='form-control' name='takerFee' value={form.takerFee} onChange={handleChange} />
            </div>
            <div className='col-12'>
              <label className='form-label'>Min amounts</label>
              <div className='row g-2'>
                {Object.entries(form.minAmounts).map(([asset, value]) => (
                  <div className='col-6 col-md-3' key={asset}>
                    <div className='input-group input-group-sm'>
                      <span className='input-group-text'>{asset}</span>
                      <input className='form-control' value={value} onChange={(event) => handleMinChange(asset, event.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='card'>
          <div className='card-header border-0'>
            <h6 className='mb-0'>Platform Settings</h6>
          </div>
          <div className='card-body d-flex flex-column gap-3'>
            <div className='form-check form-switch'>
              <input className='form-check-input' type='checkbox' id='maintenance' name='maintenanceMode' checked={form.maintenanceMode} onChange={handleChange} />
              <label className='form-check-label' htmlFor='maintenance'>Maintenance mode</label>
            </div>
            <div>
              <label className='form-label'>Maintenance message</label>
              <textarea className='form-control' name='maintenanceMessage' value={form.maintenanceMessage} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className='card'>
          <div className='card-header border-0'>
            <h6 className='mb-0'>Compliance</h6>
          </div>
          <div className='card-body'>
            <label className='form-label'>KYC threshold (MUR)</label>
            <input type='number' className='form-control' name='kycThreshold' value={form.kycThreshold} onChange={handleChange} />
            <small className='text-muted'>All users above this volume require verified KYC.</small>
          </div>
        </div>

        <button type='submit' className='btn btn-primary align-self-start'>Save settings</button>
      </form>
    </PageShell>
  );
};

export default AdminSettingsPage;

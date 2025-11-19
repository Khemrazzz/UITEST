"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { currentUser, updateProfile } = useZapex();
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState({
    firstName: currentUser?.firstName ?? "",
    lastName: currentUser?.lastName ?? "",
    phone: currentUser?.phone ?? "",
    timezone: "UTC+4",
    currency: "MUR",
    theme: "light",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile({ firstName: form.firstName, lastName: form.lastName, phone: form.phone });
    toast.success("Profile updated");
    setEditable(false);
  };

  return (
    <PageShell title='Profile' subtitle='Manage your ZapEx identity.' breadcrumb={[{ label: "Profile" }]}>
      <div className='row g-3'>
        <div className='col-12 col-xl-6'>
          <div className='card'>
            <div className='card-header border-0 d-flex justify-content-between'>
              <h6 className='mb-0'>Basic Info</h6>
              <button className='btn btn-sm btn-outline-primary' onClick={() => setEditable(!editable)}>
                {editable ? "Cancel" : "Edit"}
              </button>
            </div>
            <div className='card-body'>
              <div className='mb-3'>
                <label className='form-label'>First name</label>
                <input className='form-control' name='firstName' value={form.firstName} onChange={handleChange} disabled={!editable} />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Last name</label>
                <input className='form-control' name='lastName' value={form.lastName} onChange={handleChange} disabled={!editable} />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input className='form-control' value={currentUser?.email ?? ""} disabled />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Phone</label>
                <input className='form-control' name='phone' value={form.phone} onChange={handleChange} disabled={!editable} />
              </div>
              {editable ? (
                <button className='btn btn-primary' onClick={handleSave}>
                  Save changes
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-6'>
          <div className='card'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Preferences</h6>
            </div>
            <div className='card-body'>
              <div className='mb-3'>
                <label className='form-label'>Timezone</label>
                <select className='form-select' name='timezone' value={form.timezone} onChange={handleChange}>
                  <option value='UTC+4'>Mauritius (UTC+4)</option>
                  <option value='UTC+2'>South Africa (UTC+2)</option>
                </select>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Currency</label>
                <select className='form-select' name='currency' value={form.currency} onChange={handleChange}>
                  <option value='MUR'>MUR</option>
                  <option value='USD'>USD</option>
                </select>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Theme</label>
                <select className='form-select' name='theme' value={form.theme} onChange={handleChange}>
                  <option value='light'>Light</option>
                  <option value='dark'>Dark</option>
                </select>
              </div>
              <small className='text-muted'>Last updated {currentUser?.lastLogin ? new Date(currentUser.lastLogin).toLocaleDateString() : "--"}</small>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default ProfilePage;

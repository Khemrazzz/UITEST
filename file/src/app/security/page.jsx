"use client";

import PageShell from "@/components/zapex/PageShell";
import { useState } from "react";
import { toast } from "react-toastify";

const initialSessions = [
  { id: "sess-1", device: "Chrome on macOS", location: "Port Louis", lastActive: "2024-12-06 14:02" },
  { id: "sess-2", device: "Safari on iOS", location: "Curepipe", lastActive: "2024-12-05 08:45" },
];

const SecurityPage = () => {
  const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "" });
  const [sessions, setSessions] = useState(initialSessions);

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (!passwordForm.current || !passwordForm.next) {
      toast.error("Fill in all fields");
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Password updated");
    setPasswordForm({ current: "", next: "", confirm: "" });
  };

  const terminateSession = (id) => {
    setSessions((prev) => prev.filter((session) => session.id !== id));
    toast.info("Session terminated");
  };

  return (
    <PageShell title='Security' subtitle='Stay in control of your ZapEx account.' breadcrumb={[{ label: "Security" }]}>
      <div className='row g-3'>
        <div className='col-12 col-xl-6'>
          <div className='card'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Change Password</h6>
            </div>
            <div className='card-body'>
              <form className='d-flex flex-column gap-3' onSubmit={handlePasswordSubmit}>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Current password'
                  name='current'
                  value={passwordForm.current}
                  onChange={handlePasswordChange}
                />
                <input
                  type='password'
                  className='form-control'
                  placeholder='New password'
                  name='next'
                  value={passwordForm.next}
                  onChange={handlePasswordChange}
                />
                <input
                  type='password'
                  className='form-control'
                  placeholder='Confirm new password'
                  name='confirm'
                  value={passwordForm.confirm}
                  onChange={handlePasswordChange}
                />
                <button className='btn btn-primary' type='submit'>
                  Update password
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-6'>
          <div className='card'>
            <div className='card-header border-0 d-flex justify-content-between'>
              <h6 className='mb-0'>Two-Factor Authentication</h6>
              <span className='badge text-bg-secondary'>Off</span>
            </div>
            <div className='card-body'>
              <p className='text-muted mb-3'>Secure your account with OTP codes. MFA rollout is coming soon.</p>
              <button className='btn btn-outline-secondary' type='button' onClick={() => toast.info("2FA coming soon")}> 
                Enable 2FA (Coming soon)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='card mt-3'>
        <div className='card-header border-0'>
          <h6 className='mb-0'>Active Sessions</h6>
        </div>
        <div className='table-responsive'>
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Device</th>
                <th>Location</th>
                <th>Last active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td>{session.device}</td>
                  <td>{session.location}</td>
                  <td>{session.lastActive}</td>
                  <td>
                    <button className='btn btn-link text-danger p-0' onClick={() => terminateSession(session.id)}>
                      Terminate
                    </button>
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

export default SecurityPage;

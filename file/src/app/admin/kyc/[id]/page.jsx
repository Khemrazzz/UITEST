"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminKycReviewPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { kycQueue, updateKycStatus } = useZapex();
  const submission = kycQueue.find((entry) => entry.id === (Array.isArray(id) ? id[0] : id));
  const [status, setStatus] = useState(submission?.status ?? "Pending");
  const [remarks, setRemarks] = useState(submission?.remarks ?? "");

  if (!submission) {
    return (
      <PageShell title='Submission not found' breadcrumb={[{ label: "KYC", href: "/admin/kyc/queue" }, { label: "Review" }]}> 
        <div className='card'>
          <div className='card-body'>No submission found.</div>
        </div>
      </PageShell>
    );
  }

  const handleSave = () => {
    updateKycStatus(submission.id, status, remarks);
    toast.success("KYC updated");
    router.push("/admin/kyc/queue");
  };

  return (
    <PageShell title='KYC Review' subtitle={submission.name} breadcrumb={[{ label: "KYC", href: "/admin/kyc/queue" }, { label: submission.name }]}> 
      <div className='row g-3'>
        <div className='col-12 col-xl-6'>
          <div className='card'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Submission</h6>
            </div>
            <div className='card-body'>
              <p className='mb-1'>Document: {submission.documentType}</p>
              <p className='mb-1'>Number: {submission.payload?.documentNumber}</p>
              <p className='mb-1'>Country: {submission.country}</p>
              <p className='mb-0'>Address: {submission.payload?.address1}</p>
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-6'>
          <div className='card'>
            <div className='card-header border-0'>
              <h6 className='mb-0'>Documents</h6>
            </div>
            <div className='card-body'>
              <ul className='list-unstyled mb-0'>
                <li>ID Front: {submission.payload?.idFront ?? "uploaded"}</li>
                <li>ID Back: {submission.payload?.idBack ?? "uploaded"}</li>
                <li>Selfie: {submission.payload?.selfie ?? "uploaded"}</li>
                <li>Proof: {submission.payload?.proof ?? "uploaded"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='card mt-3'>
        <div className='card-body d-flex flex-column gap-3'>
          <div>
            <label className='form-label'>Status</label>
            <select className='form-select' value={status} onChange={(event) => setStatus(event.target.value)}>
              <option>Pending</option>
              <option>Under Review</option>
              <option>Verified</option>
              <option>Rejected</option>
            </select>
          </div>
          <div>
            <label className='form-label'>Reviewer remarks</label>
            <textarea className='form-control' rows={4} value={remarks} onChange={(event) => setRemarks(event.target.value)} />
          </div>
          <div className='d-flex gap-2'>
            <button className='btn btn-success' onClick={handleSave}>Save decision</button>
            <button className='btn btn-light' onClick={() => router.back()}>Cancel</button>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminKycReviewPage;

"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import Link from "next/link";

const KycStatusPage = () => {
  const { currentUser, kycQueue } = useZapex();
  const submission = kycQueue.find((entry) => entry.user === currentUser?.email);
  const status = submission?.status ?? currentUser?.kycStatus ?? "Not Submitted";

  const badgeClass = status === "Verified" ? "success" : status === "Rejected" ? "danger" : "warning";

  return (
    <PageShell title='KYC Status' subtitle='Track the progress of your verification.' breadcrumb={[{ label: "KYC" }]}> 
      <div className='card mb-3'>
        <div className='card-body d-flex flex-wrap justify-content-between align-items-center gap-3'>
          <div>
            <p className='text-muted mb-1'>Current status</p>
            <span className={`badge text-bg-${badgeClass}`}>{status}</span>
            {submission?.remarks ? <p className='text-danger mt-2 mb-0'>{submission.remarks}</p> : null}
          </div>
          <Link href='/kyc/submit' className='btn btn-primary btn-sm'>
            {status === "Rejected" ? "Resubmit KYC" : "Update details"}
          </Link>
        </div>
      </div>
      {submission ? (
        <div className='card'>
          <div className='card-header border-0'>
            <h6 className='mb-0'>Timeline</h6>
          </div>
          <div className='card-body'>
            <ul className='timeline'>
              <li className='timeline-item'>
                <span className='timeline-date'>{new Date(submission.submittedAt).toLocaleString()}</span>
                <h6 className='mb-1'>KYC submitted</h6>
                <p className='mb-0 text-muted'>Awaiting review</p>
              </li>
              <li className='timeline-item'>
                <span className='timeline-date'>Pending</span>
                <h6 className='mb-1'>Compliance review</h6>
                <p className='mb-0 text-muted'>Compliance officer will validate the documents.</p>
              </li>
              {submission.status !== "Pending" ? (
                <li className='timeline-item'>
                  <span className='timeline-date'>{new Date().toLocaleString()}</span>
                  <h6 className='mb-1'>Status updated to {submission.status}</h6>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      ) : (
        <div className='card'>
          <div className='card-body text-center'>
            <p className='mb-3'>No submission yet.</p>
            <Link href='/kyc/submit' className='btn btn-primary'>
              Start KYC
            </Link>
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default KycStatusPage;

"use client";

import PageShell from "@/components/zapex/PageShell";
import { useZapex } from "@/components/zapex/context/ZapexContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const KycSubmitPage = () => {
  const { submitKyc, currentUser } = useZapex();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: currentUser?.firstName ?? "",
    lastName: currentUser?.lastName ?? "",
    documentType: "Passport",
    documentNumber: "",
    dob: "",
    country: "Mauritius",
    address1: "",
    address2: "",
    city: "Port Louis",
    idFront: "",
    idBack: "",
    selfie: "",
    proof: "",
    confirm: false,
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files?.[0]?.name ?? "" }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const next = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "documentNumber",
      "dob",
      "country",
      "address1",
      "city",
      "idFront",
      "idBack",
      "selfie",
      "proof",
    ];
    requiredFields.forEach((field) => {
      if (!form[field]) next[field] = "Required";
    });
    if (!form.confirm) next.confirm = "Please confirm details";
    if (!form.consent) next.consent = "Consent is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    if (typeof window !== "undefined" && !window.confirm("Submit KYC details?")) {
      return;
    }
    setLoading(true);
    await submitKyc({ ...form, email: currentUser?.email });
    toast.success("KYC submitted");
    router.push("/kyc/status");
  };

  return (
    <PageShell
      title='Submit KYC'
      subtitle='Provide your identity details to unlock full access.'
      breadcrumb={[{ label: "KYC", href: "/kyc/status" }, { label: "Submit" }]}
    >
      <form className='card' onSubmit={handleSubmit}>
        <div className='card-body d-flex flex-column gap-4'>
          <Section title='Personal Information'>
            <div className='row g-3'>
              <Input label='First name' name='firstName' value={form.firstName} onChange={handleChange} error={errors.firstName} />
              <Input label='Last name' name='lastName' value={form.lastName} onChange={handleChange} error={errors.lastName} />
              <div className='col-12 col-md-4'>
                <label className='form-label'>Document type</label>
                <select className='form-select' name='documentType' value={form.documentType} onChange={handleChange}>
                  <option>Passport</option>
                  <option>National ID</option>
                  <option>Driver’s License</option>
                </select>
              </div>
              <Input label='Document number' name='documentNumber' value={form.documentNumber} onChange={handleChange} error={errors.documentNumber} />
              <div className='col-12 col-md-4'>
                <label className='form-label'>Date of birth</label>
                <input type='date' className='form-control' name='dob' value={form.dob} onChange={handleChange} />
                {errors.dob ? <small className='text-danger'>{errors.dob}</small> : null}
              </div>
              <div className='col-12 col-md-4'>
                <label className='form-label'>Country</label>
                <select className='form-select' name='country' value={form.country} onChange={handleChange}>
                  <option value='Mauritius'>Mauritius</option>
                  <option value='Reunion'>Reunion</option>
                  <option value='South Africa'>South Africa</option>
                </select>
                {errors.country ? <small className='text-danger'>{errors.country}</small> : null}
              </div>
            </div>
          </Section>

          <Section title='Address'>
            <div className='row g-3'>
              <Input label='Address line 1' name='address1' value={form.address1} onChange={handleChange} error={errors.address1} />
              <Input label='Address line 2' name='address2' value={form.address2} onChange={handleChange} />
              <Input label='City' name='city' value={form.city} onChange={handleChange} error={errors.city} />
            </div>
          </Section>

          <Section title='Documents'>
            <FileInput label='ID Front' name='idFront' value={form.idFront} onChange={handleChange} error={errors.idFront} />
            <FileInput label='ID Back' name='idBack' value={form.idBack} onChange={handleChange} error={errors.idBack} />
            <FileInput label='Selfie' name='selfie' value={form.selfie} onChange={handleChange} error={errors.selfie} />
            <FileInput label='Proof of address' name='proof' value={form.proof} onChange={handleChange} error={errors.proof} />
          </Section>

          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              id='confirm'
              name='confirm'
              checked={form.confirm}
              onChange={handleChange}
            />
            <label htmlFor='confirm' className='form-check-label'>
              I confirm these details are accurate
            </label>
            {errors.confirm ? <small className='text-danger d-block'>{errors.confirm}</small> : null}
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              id='consent'
              name='consent'
              checked={form.consent}
              onChange={handleChange}
            />
            <label htmlFor='consent' className='form-check-label'>
              I consent to verification checks
            </label>
            {errors.consent ? <small className='text-danger d-block'>{errors.consent}</small> : null}
          </div>
          <button type='submit' className='btn btn-primary align-self-start' disabled={loading}>
            {loading ? "Submitting..." : "Submit KYC"}
          </button>
        </div>
      </form>
    </PageShell>
  );
};

const Section = ({ title, children }) => (
  <div className='card shadow-none border rounded-3'>
    <div className='card-header border-0'>
      <h6 className='mb-0'>{title}</h6>
    </div>
    <div className='card-body'>{children}</div>
  </div>
);

const Input = ({ label, name, value, onChange, error }) => (
  <div className='col-12 col-md-4'>
    <label className='form-label'>{label}</label>
    <input name={name} className='form-control' value={value} onChange={onChange} />
    {error ? <small className='text-danger'>{error}</small> : null}
  </div>
);

const FileInput = ({ label, name, value, onChange, error }) => (
  <div>
    <label className='form-label'>{label}</label>
    <input type='file' className='form-control' name={name} onChange={onChange} />
    {value ? <small className='text-muted d-block mt-1'>{value}</small> : null}
    {error ? <small className='text-danger'>{error}</small> : null}
  </div>
);

export default KycSubmitPage;

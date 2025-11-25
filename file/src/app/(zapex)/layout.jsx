"use client";

import MasterLayout from "@/masterLayout/MasterLayout";
import ZapexProviders from "@/components/zapex/context/ZapexProviders";

const ZapexAppLayout = ({ children }) => {
  return (
    <ZapexProviders>
      <MasterLayout>{children}</MasterLayout>
    </ZapexProviders>
  );
};

export default ZapexAppLayout;

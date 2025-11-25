import MasterLayout from "@/masterLayout/MasterLayout";
import ZapexFlowPlayground from "@/components/zapex/ZapexFlowPlayground";

export const metadata = {
  title: "ZapEx Experience Lab",
  description:
    "Interactive sandbox that maps every ZapEx user story to tangible UI slices across authentication, wallets, trading, and admin ops.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        <ZapexFlowPlayground />
      </MasterLayout>
    </>
  );
};

export default Page;

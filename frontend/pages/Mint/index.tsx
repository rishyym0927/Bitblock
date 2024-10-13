import { useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect } from "react";
import { Spinner } from "./components/Spinner"; // Assuming a spinner component is available

import { BannerSection } from "@/pages/Mint/components/BannerSection";
import { HeroSection } from "@/pages/Mint/components/HeroSection";
import { StatsSection } from "@/pages/Mint/components/StatsSection";
import { OurStorySection } from "@/pages/Mint/components/OurStorySection";
import { HowToMintSection } from "@/pages/Mint/components/HowToMintSection";
import { OurTeamSection } from "@/pages/Mint/components/OurTeamSection";
import { FAQSection } from "@/pages/Mint/components/FAQSection";
import { Socials } from "@/pages/Mint/components/Socials";
import { ConnectWalletAlert } from "@/pages/Mint/components/ConnectWalletAlert";

import { useGetCollectionData } from "@/hooks/useGetCollectionData";
import { Header } from "@/components/Header";

export function Mint() {
  const { data, isLoading } = useGetCollectionData();

  const queryClient = useQueryClient();
  const { account } = useWallet();
  useEffect(() => {
    queryClient.invalidateQueries();
  }, [account, queryClient]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <Spinner className="w-12 h-12 text-green-400" /> {/* Loading Spinner */}
        <h1 className="text-xl font-semibold mt-4">Loading collections...</h1>
        <p className="text-gray-400 mt-2">Please wait while we prepare the minting experience for you!</p>
      </div>
    );
  }

  return (
    <div className="bg-black h-full">
      <Header />
      <div style={{ overflow: "hidden" }} className="overflow-hidden">
        <main className="flex flex-col gap-10 md:gap-16 mt-6 bg-black text-white">
          <ConnectWalletAlert />
          <HeroSection />
          <StatsSection />
          <OurStorySection />
          <HowToMintSection />
       
          <OurTeamSection />
          <FAQSection />
        </main>

        <footer className="footer-container py-6 px-4 w-full  mt-4 flex items-center bg-[#0f0f0f]  text-white justify-between">
          <p>{data?.collection.collection_name}</p>
          <Socials />
        </footer>
      </div>
    </div>
  );
}

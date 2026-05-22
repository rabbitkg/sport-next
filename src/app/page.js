import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import HowItWorks from "@/components/HowItWorks";
import MembershipSection from "@/components/Membership";
import TopCitiesSection from "@/components/TopCitiesSection ";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Banner/>
     <Featured/>

      <WhyChooseUs/>
      <MembershipSection/>
      <HowItWorks/>
      <TopCitiesSection/>

    </div>
  );
}

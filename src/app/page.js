import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import MembershipSection from "@/components/Membership";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Banner/>

      <WhyChooseUs/>
      <MembershipSection/>
      <HowItWorks/>

    </div>
  );
}

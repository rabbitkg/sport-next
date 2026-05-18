import Banner from "@/components/Banner";
import MembershipSection from "@/components/Membership";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Banner/>

      <WhyChooseUs/>
      <MembershipSection/>

    </div>
  );
}

import AllFacilitiesPage from "@/components/FacilityCard";
import FacilityCard from "@/components/FacilityCard";

const FacilityPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility`, {
        cache: "no-store", // always fetch fresh data
    });
    const facilities = await res.json();

    return <AllFacilitiesPage facilities={facilities} />;
};

export default FacilityPage;
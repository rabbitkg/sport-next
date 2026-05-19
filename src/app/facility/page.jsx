import AllFacilitiesPage from "@/components/FacilityCard";
import FacilityCard from "@/components/FacilityCard";

const FacilityPage = async () => {
    const res = await fetch("http://localhost:5000/facility", {
        cache: "no-store", // always fetch fresh data
    });
    const facilities = await res.json();

    return <AllFacilitiesPage facilities={facilities} />;
};

export default FacilityPage;
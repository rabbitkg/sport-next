import FacilitiesDetailsPage from "@/components/FacilitiesDetailsPage";

const FacilityDetailPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/facility/${id}`, {
        cache: "no-store",
    });
    const facility = await res.json();

    return <FacilitiesDetailsPage facility={facility} />;
};

export default FacilityDetailPage;
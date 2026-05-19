import ManageFacilitiesPage from "@/components/ManageFacilitiesPage";

const ManagePage = async () => {
    const res = await fetch("http://localhost:5000/facility", {
        cache: "no-store",
    });
    const facilities = await res.json();

    return <ManageFacilitiesPage facilities={facilities} />;
};

export default ManagePage;
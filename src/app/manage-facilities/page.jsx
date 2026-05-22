import ManageFacilitiesPage from "@/components/ManageFacilitiesPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ManagePage = async () => {

    const { token } = await auth.api.getToken({
        headers: await headers()
    })


    const res = await fetch("http://localhost:5000/facility", {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const facilities = await res.json();

    return <ManageFacilitiesPage facilities={facilities} />;
};

export default ManagePage;
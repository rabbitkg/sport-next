import ManageFacilitiesPage from "@/components/ManageFacilitiesPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ManagePage = async () => {

    const { token } = await auth.api.getToken({
        headers: await headers()
    })


    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const facilities = await res.json();

    return <ManageFacilitiesPage facilities={facilities} />;
};

export default ManagePage;
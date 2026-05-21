import FacilitiesDetailsPage from "@/components/FacilitiesDetailsPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const FacilityDetailPage = async ({ params }) => {
    const { id } = await params;

    const {token} = await auth.api.getToken({
        headers: await headers()
    })

        

    const res = await fetch(`http://localhost:5000/facility/${id}`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const facility = await res.json();

    return <FacilitiesDetailsPage facility={facility} />;
};

export default FacilityDetailPage;
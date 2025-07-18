import MyAllBookings from "@/components/tables/MyAllBookingTables";
import { headers } from "next/headers";

const fetchMyBookings = async () => {
    const res = await fetch("https://comeback-crew-ecommerce-portfolio.vercel.app/api/service", {
        headers: new Headers(await headers())
    });
    const d = await res.json();
    return d;
}

export default async function MyBookingsPage() {
    const data = await fetchMyBookings();
    

    // const [data, setData] = useState();
    // useEffect(() => {

    //     fetchMyBookings();
    // }, [])


    return <div>
        <MyAllBookings data={data} />
    </div>
}
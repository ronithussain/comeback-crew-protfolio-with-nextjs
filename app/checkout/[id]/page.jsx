import CheckoutForm from "@/components/forms/CheckoutForm";

export default async function CheckoutPage({ params }) {
    const p = await params
    const res = await fetch(`http://localhost:3000/api/service/${p.id}`);

    if (!res.ok) {
        return <div>Error loading service details</div>;
    }

    const data = await res.json();
    // console.log(data);


    return <div className="min-h-screen">
        <CheckoutForm data={data}/>
    </div>
}
import Image from 'next/image';
import Link from 'next/link';

export default async function ServicesDetailsPage({ params }) {

  const p = await params;
  const res = await fetch(`http://localhost:3000/api/service/${p.id}`);

  if (!res.ok) {
    return <div>Error loading service details</div>;
  }

  const data = await res.json();

  return (
    <div>
      <p> {p.id} </p>

      <section className="mx-auto grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
        {/* Left Side */}
        <div className="col-span-9 space-y-4">
          <Image
            className="w-full"
            src={data?.image || "/assets/images/default.jpg"}
            width={400}
            height={280}
            alt={data?.title || "Service image"}
          />
          <h1 className="font-bold text-3xl">{data?.text}</h1>
          <p className="text-justify">{data?.description}</p>
        </div>

        {/* Right Side */}
        <div className="col-span-3 space-y-4">

          <Link href={`/checkout/${data?._id}`}>
            <button className="w-full text-white h-9 bg-[#a91f64]">Checkout</button>
          </Link>
          
          <p className="text-center text-xl font-bold">
            Price: ${data?.price}
          </p>
        </div>
      </section>
    </div>
  );
};

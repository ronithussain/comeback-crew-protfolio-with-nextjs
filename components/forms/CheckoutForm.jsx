"use client";


import { useSession } from "next-auth/react";
import toast from "react-hot-toast";


const CheckoutForm = ({ data }) => {
  const { data: session } = useSession();
  console.log(session);

  const handleBookService = async (e) => {
    toast("Submitting Booking...");
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const email = form.email.value;

    const bookingPayload = {
      // Session
      customerName: name,
      email,

      // User Inputs
      date,
      phone,
      address,

      // Extra information
      service_id: data._id,
      service_name: data.text,
      service_img: data.image,
      service_price: data.price,
    };
    console.log(bookingPayload);

    const res = await fetch("http://localhost:3000/api/service", {
      method: "POST",
      body: JSON.stringify(bookingPayload)
    });
    const postedResponse = await res.json()
    // form.reset();
    console.log("Posted Data", postedResponse);
  };

  return (
    <div className="my-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8 text-[#a91f64]">
          Book Service: {data?.text}
        </h2>
        <form onSubmit={handleBookService} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                readOnly
                defaultValue={session?.user?.name || ""}
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                readOnly
                defaultValue={session?.user?.email || ""}
                className="input input-bordered w-full"
              />
            </div>

            {/* Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Due Amount</span>
              </label>
              <input
                type="text"
                name="price"
                readOnly
                defaultValue={`$${data?.price || 0}`}
                className="input input-bordered w-full"
              />
            </div>

            {/* Date */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Date</span>
              </label>
              <input
                type="date"
                name="date"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Phone */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Your phone number"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Address */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Present Address</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your present address"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control">
            <button
              type="submit"
              className="btn btn-block bg-[#a91f64] text-white hover:bg-[#901652] text-lg font-semibold"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default CheckoutForm;
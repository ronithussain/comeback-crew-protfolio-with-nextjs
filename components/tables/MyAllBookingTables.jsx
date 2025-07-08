import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import DeleteBookingButton from "@/app/my-booking/DeleteBookings";

const MyAllBookings = ({ data }) => {
 console.log("Update Booking Data:", data);

  return (
    <div className="my-10">
      <h1 className="text-center text-3xl font-bold mb-6">My All Bookings</h1>

      <div className="overflow-x-auto w-full mx-auto">
        <table className="table table-zebra table-md bg-base-100 rounded-lg">
          {/* head */}
          <thead className="bg-[#a91f64] text-white text-base">
            <tr>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr key={item._id} className="hover">
                <td>
                  <div className="">
                    <Image
                      src={item.service_img}
                      alt={item.service_name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>
                </td>
                <td>{item.service_name}</td>
                <td>{item.date}</td>
                <td>${item.service_price}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  <Link href={`/my-booking/${item._id}`}>
                    <button className="btn btn-outline btn-sm text-[#a91f64] hover:bg-[#a91f64] hover:text-white">
                      <FaRegEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  
                  <DeleteBookingButton id={item._id} />
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAllBookings;

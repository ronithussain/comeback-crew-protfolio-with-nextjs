import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


const ServicesSection = async () => {
  // 
  const serviceCollection = dbConnect(collectionNamesObj.servicesCollection);
  const data = await serviceCollection.find({}).toArray();

  return (
    <div className="my-12 max-w-[774px]:my-6 sm:px-6 px-1">
      <div className="flex flex-col justify-center items-center mb-6">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800 sm:mb-2 mb-1 ">Our Service Area</h2>
        <span className="sm:text-base text-sm text-gray-600 text-center">the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </span>
      </div>

      <div className="grid grid-cols-12 gap-4 ">
        {data.map((item) => {
          return (
            <div
              className="col-span-12 md:col-span-6 lg:col-span-4 p-4 h-full border border-gray-300 "
              key={item._id}
            >
              <figure className="w-full h-3/4 flex justify-center items-center">
                <Image
                  className="w-full h-full object-fit"
                  src={item.image || "/images/default.jpg"}
                  width={314}
                  height={108}
                  alt=""
                />
              </figure>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h2 className="font-bold text-xl">{item.title}</h2>
                  <p className="font-bold text-xl text-[#A91F64]">
                    Price : ${item.price}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/services/${item._id}`}
                    className="text-[#A91F64]"
                  >
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesSection;
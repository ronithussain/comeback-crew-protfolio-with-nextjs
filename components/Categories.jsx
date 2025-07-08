import Image from "next/image";
import { categories } from "../public/data/data.json"
import Link from "next/link";

const Categories = () => {
    return (
        <div className="mx-auto my-8 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
            {
                categories.map((category, index) => (
                    <div
                        key={index}
                        className="group relative flex h-80 w-full flex-col justify-end overflow-hidden rounded-2xl"
                    >
                        <Image
                            src={category.image}
                            alt=""
                            fill
                            style={{ objectFit: "cover" }}
                            className="z-0 transition-transform duration-300 group-hover:scale-100"
                        />
                        {/* dark overlay */}
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                        <div className="relative z-10 pb-6 text-center">
                            <Link href="/products">
                                <button
                                    className="rounded-full bg-white px-6 py-2 text-sm font-semibold"
                                >
                                    {category.buttonText}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Categories;
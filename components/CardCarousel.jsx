"use client"
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import ProductCard from "./ProductCard";

{ /* left arrow component*/ }
const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute left-[10px] top-1/2 transform -translate-y-1/2 bg-white text-black shadow-md p-2 rounded-full hover:bg-[#a91f64] transition duration-500 hover:text-white cursor-pointer z-10 outline-none"
    >
        <FaArrowLeft size={20} />
    </button>
)
const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute right-[10px] top-1/2 transform -translate-y-1/2 bg-white text-black shadow-md p-2 rounded-full hover:bg-[#a91f64] transition duration-500 hover:text-white cursor-pointer z-10 outline-none"
    >
        <FaArrowRight size={20} />
    </button>
)


const CardCarousel = ({ title, cards }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ]
    }
    return (
        <div className="w-full max-w-7xl mx-auto my-12 px-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">{title}</h2>
                <Link href="/products">
                    <span className="text-lg text-gray-600 hover:text-[#a91f64]">View More</span>
                </Link>
            </div>

            <div className="relative">
                <Slider {...settings}>
                    {cards.map((card, index) => (
                        <div className="px-2" key={index}>
                            <ProductCard
                                image={card.image}
                                text={card.text}
                                price={card.price}
                                id={card.id}
                                category={card.category}
                                inStock={card.inStock}
                            />
                        </div>
                    ))}

                </Slider>
            </div>
        </div>
    );
};

export default CardCarousel;
"use client"
import { addToCart } from "@/lib/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/lib/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


const wishlistPage = () => {
    // get the dispatch function and the current wishlist items from redux store
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.items);

    // remove item from wishlist
    const removeItem = (id) => {
        dispatch(removeFromWishlist(id))
    }

    // add item from wishlist to the cart
    const addToCartHandler = (item) => {
        const cartItem = {
            ...item, quantity: 1
        }
        dispatch(addToCart(cartItem))
    }

    return (
        <div className='w-full max-w-7xl mask-auto my-12 px-4'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
                wishlist
            </h1>
            <p className="text-gray-600 mb-6">{wishlist.length} Items in your wishlist</p>

            <div className="w-full">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                    {/* if wishlist is empty show message and shop link */}
                    {wishlist.length === 0 ? (
                        <div className="text-center py-6">
                            <p>Your Wishlist is empty</p>
                            <Link
                                href="/products"
                                className="mt-4 inline-block bg-[#a91f64] text-white px-4 py-12 rounded-md hover:bg-[#8a1b54] text-sm sm:text-base"
                            >
                                Shop Now
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* wishlist table headers (desktop view) */}
                            <div
                                className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 text-gray-700 font-semibold mb-4">
                                <div>Product</div>
                                <div>Price</div>
                                <div>Quantity</div>
                                <div>Total Price</div>
                            </div>

                            {/* render each item in the wishlist */}
                            {wishlist.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr] gap-6 items-start sm:items-center py-6 ${index < wishlist.length - 1 ? "border-b border-gray-300" : ""

                                        }`}
                                >
                                    {/* product image and details */}
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="relative w-16 h-16 flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt=""
                                                fill
                                                style={{ objectFit: "cover" }}
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="flex-1 sm:flex-none">
                                            <div className="flex justify-between items-center">
                                                <p className="text-gray-800 font-medium text-sm sm:text-base">{item.text}

                                                </p>

                                                {/* trash icon for mobile view */}
                                                <FaTrash
                                                    className="text-gray-500 hover:text-red-500 cursor-pointer text-xs sm:hidden"
                                                    onClick={() => removeItem(item.id)}
                                                />
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-500">{item.category}</p>
                                        </div>
                                    </div>

                                    {/* item price */}
                                    <div className="text-gray-700 text-sm sm:text-base flex flex-col w-full sm:block">
                                        <span>Price:</span>
                                        $
                                        {(typeof item.price === "number" && !isNaN(item.price)
                                            ? item.price
                                            : 0
                                        ).toFixed(2)}
                                    </div>

                                    {/*stock status */}
                                    <div className="text-sm sm:text-base flex flex-col w-full sm:block">
                                        <span className="sm:hidden text-xs font-medium text-gray-600">Stock:</span>
                                        <span
                                            className={`text-xs sm:text-sm font-semibold ${item.inStock
                                                ? "text-green-600"
                                                : "text-red-600"}`}
                                        >
                                            {item.inStock ? "In Stock" : "Out of stock"}
                                        </span>
                                    </div>

                                    {/* actions buttons (add to cart & delete) */}
                                    <div className="flex flex-col gap-2 w-full sm:flex-row sm:items-center sm:gap-4">
                                        <span className="sm:hidden text-xs font-medium text-gray-600">
                                            Actions:
                                        </span>
                                        <div className="flex items-center gap-4">
                                            <button
                                                disabled={!item.inStock}
                                                onClick={() => addToCartHandler(item)}
                                                className="bg-[#a91f64] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-[#8a1b54] disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto cursor-pointer"
                                            >
                                                Add to cart
                                            </button>

                                            {/* trash icon for desktop */}
                                            <FaTrash className="hidden sm:block text-gray-500 hover:text-red-500 cursor-pointer text-sm"
                                                onClick={() => removeItem(item.id)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default wishlistPage;
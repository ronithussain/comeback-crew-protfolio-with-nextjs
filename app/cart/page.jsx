"use client"
import { removeFromCart, updateQuantity } from "@/lib/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


const CartPage = () => {
    // set up dispatch and get cart items from redux store
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    // update the quantity of item (minimum 1)
    const handleUpdateQuantity = (id, delta) => {
        const item = cartItems.find((item) => item.id === id);
        if (item) {
            const newQuantity = Math.max(1, item.quantity + delta);
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };
    // remove item from the cart by id
    const removeItem = (id) => {
        dispatch(removeFromCart(id));
    };

    // calculate the total price of all cart items
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // calculate the total number of items in the cart
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="w-full max-w-7xl mx-auto my-12 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Shopping Bag
            </h1>
            <p className="text-gray-600 mb-6">{totalItems} Items in the bag</p>
            <div className="flex flex-col lg:flex-row gap-6">

                {/* left section: cart items */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-4">
                                <p className="text-gray-700"> Your cart is empty</p>
                                <Link
                                    href="/products"
                                    className="mt-4 inline-block bg-[#a91f64] text-white px-4 py-2 rounded-md hover:bg-[#8a1b54] text-sm sm:text-base"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* header */}
                                <div
                                    className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 text-gray-700 font-semibold mb-4">
                                    <div>Product</div>
                                    <div>Price</div>
                                    <div>Quantity</div>
                                    <div>Total Price</div>
                                </div>

                                {/* items */}
                                {cartItems.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`flex flex-col sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-start sm:items-center py-4 ${index < cartItems.length - 1
                                            ? "border-b border-gray-400"
                                            : ""
                                            }`}
                                    >
                                        {/* product image and name div-1 */}
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink">
                                                <Image
                                                    src={item.image}
                                                    alt=""
                                                    fill
                                                    style={{ objectFit: "cover" }}
                                                    className="rounded" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-800 font-medium text-sm sm:text-base">
                                                    {item.text}
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-700">
                                                    {item.category}
                                                </p>
                                            </div>
                                        </div>

                                        {/* product price div-2 */}
                                        <div className="text-gray-700 text-sm sm:text-base flex justify-between w-full sm:block pl-2.5">
                                            <span>Price:</span>
                                            {Number(item.price).toFixed(2)}
                                        </div>

                                        {/* product quantity div-3 */}
                                        <div className="flex justify-between items-center w-full">
                                            <span className="sm:hidden font-semibold ">Quantity</span>

                                            <div className="flex items-center sm:gap-x-1 ">
                                                {/* decrease button */}
                                                <button
                                                    className="w-6 h-6 pb-1 flex items-center justify-center bg-transparent border-2 border-gray-400 rounded-lg hover:bg-gray-300 text-black text-2xl cursor-pointer"
                                                    onClick={() => handleUpdateQuantity(item.id, -1)}
                                                >
                                                    -
                                                </button>
                                                <span className="w-7 sm:w-8 text-center text-sm sm:text-base">
                                                    {item.quantity}
                                                </span>

                                                {/* increase button */}
                                                <button
                                                    className="w-6 h-6 pb-1 flex items-center justify-center bg-transparent border-2 border-gray-400 rounded-lg hover:bg-gray-300 text-black text-xl cursor-pointer"
                                                    onClick={() => handleUpdateQuantity(item.id, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>

                                        </div>
                                        {/* total price div-4 */}
                                        <div className="text-gray-700 text-sm sm:text-base flex justify-between w-full sm:block pl-4">
                                            <span className="sm:hidden font-semibold">Total:</span>
                                            {(Number(item.price) * item.quantity).toFixed(2)}
                                        </div>

                                        {/* remove icon div-5 */}
                                        <div className="self-center sm:self-auto">
                                            <FaTrash
                                                className="text-gray-500 hover:text-red-500 cursor-pointer text-xs sm:text-sm"
                                                onClick={() => removeItem(item.id)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                {/* right section: coupon & total price */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Cart Summary
                        </h3>
                        {/* coupon code */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">
                                Coupon Code
                            </label>
                            <div className="flex gap-2">
                                <input
                                    text="text"
                                    placeholder="Enter Code"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a91f64]"
                                />
                                <button
                                    className="bg-[#a91f64] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-[#8a1b54] text-sm sm:text-base cursor-pointer">
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* cart total price */}
                        <div className="border-t pt-4">
                            <div className="flex justify-between text-gray-700 mb-2 text-sm sm:text-base">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <button
                                className="w-full mt-4 bg-[#a91f64] text-white px-4 py-2 rounded-md hover:bg-[#8a1b54] disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base cursor-pointer"
                                disabled={cartItems.length === 0}
                            >
                                Proceed to checkout
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartPage;
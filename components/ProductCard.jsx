import { addToCart, removeFromCart } from '@/lib/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/lib/wishlistSlice';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FaCheck, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

// receive the id prop in redux
const ProductCard = ({ id, image, text, price, category, inStock }) => {

    // set up redux dispatch and select cart items to check if product is in cart
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const isInCart = cartItems.some((item) => item.id === id);

    // get wishlist items and check if the item is already added
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const isInWishlist = wishlistItems.some((item) => item.id === id);
    // convert price to a number
    const numericPrice = typeof price === "string" ? parseFloat(price.replace("$", "")) || 0 : Number(price) || 0;

    // handle heart icon to toggle add/remove items from wishlist
    const handleToggleHeart = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(id));
            toast.success("Remove from wishlist", {
                duration: 3000,
                position: "bottom-center",
                icon: <FaCheck className='text-white' />,
                style: {
                    background: "#ef4444",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "12px 20px",
                    borderRadius: "6px",
                    transition: "opacity .3x ease"
                }
            })
        } else {
            dispatch(
                addToWishlist({
                    id,
                    image,
                    text,
                    price: numericPrice,
                    category,
                    inStock
                })
            );
            toast.success("Successfully Added To Wishlist", {
                duration: 3000,
                position: "bottom-center",
                icon: <FaCheck className='text-white' />,
                style: {
                    background: "#22c55e",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "12px 20px",
                    borderRadius: "6px",
                    transition: "opacity .3s ease"
                }
            })
        }
    }
    // handle cart icon click to toggle add/remove product from cart and show notifications
    const handleToggleCart = () => {
        if (isInCart) {
            dispatch(removeFromCart(id))
            toast.success("Remove from cart", {
                duration: 3000,
                position: "bottom-center",
                icon: <FaCheck className='text-white' />,
                style: {
                    background: "#ef4444",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "12px 20px",
                    borderRadius: "6px",
                    transition: "opacity .3x ease"
                }
            })
        } else {
            dispatch(addToCart({ id, image, text, price: numericPrice, quantity: 1, category, inStock }))
            toast.success("Successfully Added To Cart", {
                duration: 3000,
                position: "bottom-center",
                icon: <FaCheck className='text-white' />,
                style: {
                    background: "#22c55e",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "12px 20px",
                    borderRadius: "6px",
                    transition: "opacity .3s ease"
                }
            })
        }
    }
    return (
        <div className='bg-white rounded-lg shadow-md overflow-visible flex flex-col h-[400px]'>
            <div className='relative w-full h-64'>
                <Image
                    src={image}
                    alt=''
                    fill
                    style={{ objectFit: "cover" }} />
            </div>

            <h3 className='text-lg font-semibold text-gray-800 px-4 py-3 m-0'>
                {text}
            </h3>

            <div className='flex items-center justify-between px-4 pt-0 pb-4 m-0'>
                <span className='text-xl font-bold text-gray-700'>${numericPrice.toFixed(2)}</span>
                <div className='flex space-x-3'>
                    <FaHeart className={`cursor-pointer ${isInWishlist ? "text-red-500" : "text-gray-600"} hover:text-red-500 transition duration-500`}
                        onClick={handleToggleHeart}
                    />
                    <FaShoppingCart className={`cursor-pointer ${isInCart ? "text-green-500" : "text-gray-500 hover:text-green-600 transition duration-500"
                        }`}
                        onClick={handleToggleCart}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
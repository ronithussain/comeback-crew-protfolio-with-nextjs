"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaHeart, FaShoppingCart, FaTimes, FaTruck } from "react-icons/fa"
import { useSelector } from "react-redux";


const NavBar = () => {
    const { data: session, status } = useSession();
    console.log(session);

    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // get cart items from redux store to display the item count
    const cartItems = useSelector((state) => state.cart.items)
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)


    // get wishlist items from redux store to display item count
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const wishlistItemCount = wishlistItems.length;
    return (
        <nav className='sticky top-0 z-50 bg-slate-200 sm:px-6 px-1 py-2 flex items-center justify-between'>
            {/* left section: logo */}
            <div className=' flex flex-col leading-tight'>
                <Link href={"/"}>
                    <span className='text-base md:text-2xl font-bold text-[#a91f64]'>
                        Comeback-Crew
                    </span>
                </Link>
                <span className="text-xs sm:text-sm text-gray-700 tracking-widest self-center">
                    Furniture Store
                </span>
            </div>

            {/* center section: nav links */}
            <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
                <li>
                    <Link
                        href="/"
                        className={`hover:text-[#a91f64] transition duration-500 ${pathname === '/' ? 'text-[#a91f64] font-semibold underline' : ''
                            }`}
                    >
                        Home
                    </Link>
                </li>

                <li
                    className={`hover:text-[#a91f64] transition duration-500 cursor-pointer ${pathname === '/new-arrivals' ? 'text-[#a91f64] font-semibold underline' : ''
                        }`}
                >
                    New Arrivals
                </li>

                <li>
                    <Link
                        href="/my-booking"
                        className={`hover:text-[#a91f64] transition duration-500 cursor-pointer ${pathname === '/my-booking' ? 'text-[#a91f64] font-semibold underline' : ''
                            }`}
                    >
                        My Bookings
                    </Link>
                </li>

                <li>
                    <Link
                        href="/products"
                        className={`hover:text-[#a91f64] transition duration-500 ${pathname === '/products' ? 'text-[#a91f64] font-semibold underline' : ''
                            }`}
                    >
                        Products
                    </Link>
                </li>
            </ul>

            {/* right section: icons */}
            <div className=" flex items-center gap-6 text-gray-700 text-xl">
                <div className="flex gap-6 items-center">
                    <FaTruck className="hover:text-[#a01f64] transition duration-500" />
                    <Link href="/wishlist" className="relative">
                        <FaHeart
                            className="hover:text-[#a01f64] transition duration-500" />
                        {wishlistItemCount > 0 && (
                            <span className="absolute -top-3 -right-4 text-xs text-white bg-[#a91f64] rounded-full px-1.5 py-0.5">
                                {wishlistItemCount}
                            </span>
                        )}
                    </Link>
                    <Link href="/cart" className="relative ">
                        <FaShoppingCart className="hover:text-[#a01f64] transition duration-500" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-3 -right-4 text-xs text-white bg-[#a91f64] rounded-full px-1.5 py-0.5">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    <ul className="menu menu-horizontal px-1 hidden sm:block">
                        {status == "authenticated" ? (
                            <>
                                <ul className="flex items-center gap-x-1">
                                    <li>
                                        {session?.user?.image ? (
                                            <Image
                                                className="rounded-full"
                                                src={session?.user?.image}
                                                alt="user-logo"
                                                width={80}
                                                height={80}
                                            />
                                        ) : (
                                            <div className="bg-[#a91f64] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold uppercase">
                                                {session?.user?.name?.charAt(0)}
                                            </div>
                                        )}
                                    </li>

                                    <li
                                        className="cursor-pointer hover:text-[#a91f64] transition duration-500 text-gray-700 font-medium"
                                        onClick={() => signOut()}>
                                        LogOut
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <>
                                {/* <li className="cursor-pointer hover:text-[#a91f64] text-gray-700 font-medium">
                                    <Link href={"/register"}>Register</Link>
                                </li> */}
                                <li className="cursor-pointer hover:text-[#a91f64] transition duration-500 text-gray-700 font-medium">
                                    <Link href={"/login"}>Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                {/* menu icon */}
                <div className="md:hidden flex">
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <FaTimes className="text-2xl hover:text-[#a01f64] transition duration-500 cursor-pointer" />
                        ) : (
                            <FaBars className="text-2xl hover:text-[#a01f64] transition duration-500 cursor-pointer" />
                        )
                        }
                    </button>
                </div>
            </div>


            {/* mobile section: menu */}
            {isMenuOpen && (
                <ul className="absolute top-full left-0 w-full bg-white flex flex-col items-center gap-4 py-4 text-gray-700 font-medium md:hidden shadow-md">

                    <li>
                        <Link href="/" onClick={toggleMenu}
                            className={`hover:text-[#a91f64] transition duration-300 ${pathname === '/' ? 'text-[#a91f64] font-semibold underline' : ''
                                }`}>
                            Home
                        </Link>
                    </li>
                    {/* <li>
                        <Link href="/new-arrivals" onClick={toggleMenu} 
                        className={`hover:text-[#a91f64] transition duration-300 ${pathname === '/new-arrivals' ? 'text-[#a91f64] font-semibold underline' : ''
                            }`}>
                            New Arrivals
                        </Link>
                    </li> */}
                    <li>
                        <Link href="/my-booking" onClick={toggleMenu}
                            className={`hover:text-[#a91f64] transition duration-300 ${pathname === '/my-booking' ? 'text-[#a91f64] font-semibold underline' : ''
                                }`}>
                            My Bookings
                        </Link>
                    </li>
                    <li>
                        <Link href="/products" onClick={toggleMenu}
                            className={`hover:text-[#a91f64] transition duration-300 ${pathname === '/products' ? 'text-[#a91f64] font-semibold underline' : ''
                                }`}>
                            Products
                        </Link>
                    </li>

                    {/*  Login / Register buttons */}
                    <li>
                        <Link href="/register" onClick={toggleMenu}
                            className="hover:text-[#a91f64] transition duration-500">
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link href="/login" onClick={toggleMenu}
                            className="hover:text-[#a91f64] transition duration-500">
                            Login
                        </Link>
                    </li>
                </ul>
            )}

        </nav>
    );
};

export default NavBar;
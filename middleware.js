import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server"

export const middleware = async (req) => {
    console.log("FROM MIDDLEWARE", req.nextUrl.pathname);


    const token = await getToken({
        req,
        secureCookie: process.env.NODE_ENV === "production" ? true : false,
    })

    if (token) {
        return NextResponse.next()
    }
    else {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: [
        '/my-booking',
        '/my-booking/:path*',
        '/checkout/:path*',
        '/products',
    ],
}


// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export const middleware = async (req) => {
//     try {
//         console.log(" MIDDLEWARE Triggered:", req.nextUrl.pathname);

//         const token = await getToken({
//             req,
//             secureCookie: process.env.NODE_ENV === "production",
//         });

//         console.log(" TOKEN:", token);

//         if (token) {
//             return NextResponse.next();
//         } else {
//             return NextResponse.redirect(new URL("/login", req.url));
//         }
//     } catch (error) {
//         console.error(" Middleware Error:", error);
//         return NextResponse.redirect(new URL("/error", req.url));
//     }
// };

// export const config = {
//     matcher: [
//         "/my-booking",
//         "/my-booking/:path*",
//         "/checkout/:path*",
//         "/products",
//     ],
// };

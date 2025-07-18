"use client"

import Link from "next/link";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";


export default function LoginForm() {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        toast("Submitting......")

        try {
            const response = await signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
                redirect: false
            });
            if (response.ok) {
                toast.success("Log In Successfully");
                form.reset();
                router.push("/");
            } else {
                toast.error("Authentication Failed")
            }
            // console.log({ email, password })
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto p-8  space-y-6"
        >
            {/* Email */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Email</span>
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    required
                />
            </div>

            {/* Password */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Password</span>
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    required
                />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn w-full  bg-[#A91564] text-white/90">
                Sign In
            </button>

            {/* Divider */}
            <div className="divider">Or Sign In with</div>

            {/* Social Login */}
            <SocialLogin />

            {/* Register Link */}
            <p className="text-center">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#A91564] font-semibold hover:underline">
                    Register
                </Link>
            </p>
        </form>

    );
}
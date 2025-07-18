"use client"

import Link from "next/link";
import { registerUser } from "../action/auth/registerUser";
import { useRouter } from "next/navigation";
import SocialLogin from "../login/SocialLogin";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const router = useRouter();

 const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  try {
    const response = await registerUser({
      name,
      email,
      password,
    });

    if (response?.success) {
      // ✅ auto login after successful registration
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      toast.success("Registration successful!");
      form.reset();
      router.push("/");
    } else {
      toast.error(response?.message || "Registration failed");
    }
  } catch (err) {
    toast.error("Something went wrong");
    console.log(err);
  }
}


  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-8 mx-auto p-0"
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            name="name"
            required
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Email</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Password</span>
          </label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>

        <button className="w-full h-12 bg-[#A91564] text-white font-bold">
          Register Now
        </button>

        <p className="text-center">Or Sign In with</p>
        <SocialLogin />

        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-[#A91564] font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}


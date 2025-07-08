"use client"

import Link from "next/link";
import { registerUser } from "../action/auth/registerUser";
import SocialLogin from "../login/SocialLogin";

export default function RegisterForm() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    await registerUser({ name, email, password })
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
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Email</span>
          </label>
          <input
            type="text"
            name="email"
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


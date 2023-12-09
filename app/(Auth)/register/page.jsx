"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "@/app/components/Loader";
import { setCredentials } from "@/app/redux/features/auth/authSlice";
import { useRegisterMutation } from "@/app/redux/api/userApiSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const sp = new URLSearchParams();
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [router, redirect, userInfo]);

  return (
    <section className=' pl-[10rem]  flex-wrap'>
      <div className='mr-[4rem] mt-[5rem]'>
        <h1 className='text-2xl font-semibold mb-4'>Register</h1>
      </div>

      <form
        // onSubmit={submitHandler}
        className='container w-[25rem] flex flex-col gap-5'
      >
        <div className='my-2rem'>
          <label htmlFor='name' className='block text-sm font-medium '>
            Name
          </label>
          <input
            type='name'
            id='name'
            className='mt-1 p-2 bg-transparent border rounded w-full'
            placeholder='name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='my-2rem'>
          <label htmlFor='email' className='block text-sm font-medium '>
            Email Address
          </label>
          <input
            type='email'
            id='email'
            className='mt-1 p-2 bg-transparent border rounded w-full'
            placeholder='name@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='my-2rem'>
          <label htmlFor='email' className='block text-sm font-medium '>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='mt-1 p-2 bg-transparent border rounded w-full'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='my-2rem'>
          <label htmlFor='email' className='block text-sm font-medium '>
            Confirm Password
          </label>
          <input
            type='confirmPassword'
            id='confirmPassword'
            className='mt-1 p-2 bg-transparent border rounded w-full'
            placeholder='Enter your confirm password'
            value={confirmPassword}
            onChange={(e) => confirmPassword(e.target.value)}
          />
        </div>

        <button
          // disabled={isLoading}
          type='submit'
          className='bg-pink-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem] '
        >
          register
        </button>

        {/* {isLoading && <Loader />} */}
      </form>
    </section>
  );
};

export default Register;

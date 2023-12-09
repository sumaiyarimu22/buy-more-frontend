"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/app/redux/api/userApiSlice";
import { setCredentials } from "@/app/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "@/app/components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = router.query || {};
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [router, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      // console.log(res);
      dispatch(setCredentials({ ...res }));
      toast.success("Login successfull");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
      console.error("Login failed:", error);
    }
  };

  return (
    <section className=' pl-[10rem] flex flex-wrap'>
      <div className='mr-[4rem] mt-[5rem]'>
        <h1 className='text-2xl font-semibold mb-4'>Sign In</h1>

        <form
          onSubmit={submitHandler}
          className='container w-[25rem] flex flex-col gap-5'
        >
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

          <button
            disabled={isLoading}
            type='submit'
            className='bg-pink-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem] '
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className='mt-4'>
          <div className=''>
            New Customer ?
            <Link
              href={redirect ? `/register?redirect=${redirect}` : "/register"}
              className='text-pink-500 hover:underline'
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

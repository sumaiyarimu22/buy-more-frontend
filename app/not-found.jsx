import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center '>
      <div className='w-1/2'>
        <h1 className='text-2xl font-medium py-2'>
          We Are Sorry, Page Not Found
        </h1>
        <p>
          Unfortunately the page you were looking for could not be found. It may
          be temporarily unavailable, moved or no longer exist. Check the Url
          you entered for any mistakes and try again.{" "}
          <span>
            <Link href='/' className='text-pink-500 underline'>
              Back to Homepage
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;

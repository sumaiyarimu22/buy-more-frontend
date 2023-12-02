"use client";

import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import "./Navigation.css";
import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/app/redux/api/userApiSlice";
import { logout } from "@/app/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const [logoutApiCall] = useLoginMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between ps-3 text-white bg-black w-[4%] hover:w-[15%] h-[100vh]  fixed `}
      id='navigation-container'
    >
      <div className='flex flex-col justify-center gap-10 '>
        <Link
          href='/'
          className='flex items-center cursor-pointer transition-transform transform hover:translate-x-2'
        >
          <AiOutlineHome className='mr-2 mt-[3rem]' size={24} />
          <span className='hidden nav-item-name mt-[3rem]'>HOME</span>
        </Link>

        <Link
          href='/shop'
          className='flex items-center transition-transform transform hover:translate-x-2'
        >
          <AiOutlineShopping className='mr-2 ' size={24} />
          <span className='hidden nav-item-name '>SHOP</span>{" "}
        </Link>

        <Link
          href='/cart'
          className='flex items-center transition-transform transform hover:translate-x-2'
        >
          <AiOutlineShoppingCart className='mr-2 ' size={24} />
          <span className='hidden nav-item-name '>CART</span>{" "}
        </Link>

        <Link
          href='/favorite'
          className='flex items-center transition-transform transform hover:translate-x-2'
        >
          <FaHeart className='mr-2 ' size={24} />
          <span className='hidden nav-item-name '>FAVORITE</span>{" "}
        </Link>
      </div>

      <div className='relative'>
        <button
          onClick={toggleDropdown}
          className='flex items-center text-gray-800 focus:outline-none'
        >
          {userInfo ? <span>{userInfo.username}</span> : <></>}
        </button>
      </div>

      <ul className='space-y-10 mb-[3rem]'>
        <li>
          <Link
            href='/login'
            className='flex items-center cursor-pointer transition-transform transform hover:translate-x-2'
          >
            <AiOutlineLogin className='mr-2' size={24} />
            <span className='hidden nav-item-name '>Login</span>
          </Link>
        </li>
        <li>
          <Link
            href='/register'
            className='flex items-center cursor-pointer transition-transform transform hover:translate-x-2'
          >
            <AiOutlineUserAdd className='mr-2' size={24} />
            <span className='hidden nav-item-name '>Register</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

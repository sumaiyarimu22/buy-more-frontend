"use client";

import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/app/redux/api/userApiSlice";
import { logout } from "@/app/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./Navigation.css";
import Link from "next/link";

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
    <div className='relative'>
      <div
        style={{ zIndex: 9999 }}
        className={`${
          showSidebar ? "hidden" : "flex"
        } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between ps-3 text-white bg-black min-w-[5%] hover:w-[15%] h-[100vh] left-0 top-0 fixed border-r border-white/20`}
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

        <button className='relative '>
          <div
            onClick={toggleDropdown}
            className='flex items-center text-gray-800 focus:outline-none'
          >
            {userInfo ? (
              <div className='text-white '>{userInfo.username}</div>
            ) : (
              <></>
            )}
            <span>
              {" "}
              {userInfo && (
                <RiArrowDropDownLine size={26} className='text-white' />
              )}
            </span>
          </div>
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    href={"/admin/dashboard"}
                    className='block px-4 py-2 hover:bg-gray-100'
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}

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
    </div>
  );
};

export default Navigation;

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
import { useLogoutMutation } from "@/app/redux/api/userApiSlice";
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

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='relative'>
      <div
        className={`${
          showSidebar ? "hidden" : "flex"
        } xl:flex lg:flex md:hidden  flex-col justify-between ps-3 bg-gray-50 min-w-[5%] hover:min-w-[15%] h-[100vh] left-0 top-0 fixed border-r border-black/10 z-[999] py-[3rem] pe-2`}
        id='navigation-container'
      >
        <div className='flex flex-col justify-center gap-10 '>
          <Link
            href='/'
            className='flex items-center cursor-pointer transition-transform transform hover:translate-x-2'
          >
            <AiOutlineHome className='mr-2 ' size={24} />
            <span className='hidden nav-item-name '>HOME</span>
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
        <div className='relative '>
          <button
            onClick={toggleDropdown}
            className='flex items-center text-gray-800 focus:outline-none'
          >
            {userInfo && (
              <>
                <span className=''>{userInfo.username}</span>
                <RiArrowDropDownLine />
              </>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute right-0 mt-2 mr-14  space-y-1 bg-gray-100 text-gray-600 mb-10 ${
                !userInfo.isAdmin ? "-top-24" : "-top-64"
              } `}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      href='/admin/dashboard'
                      className='block px-4 py-1 hover:bg-gray-200'
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/admin/productlist'
                      className='block px-4 py-1 hover:bg-gray-200'
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/admin/categorylist'
                      className='block px-4 py-1 hover:bg-gray-200'
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/admin/orderlist'
                      className='block px-4 py-1 hover:bg-gray-100'
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/admin/userlist'
                      className='block px-4 py-1 hover:bg-gray-200'
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  href='/profile'
                  className='block px-4 py-1 hover:bg-gray-200'
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className='block w-full px-4 py-1 text-left hover:bg-gray-200'
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
          {!userInfo && (
            <ul>
              <li>
                <Link
                  href='/login'
                  className='flex items-center mt-5 transition-transform transform hover:translate-x-2'
                >
                  <AiOutlineLogin className='mr-2 mt-[4px]' size={26} />
                  <span className='hidden nav-item-name'>LOGIN</span>
                </Link>
              </li>
              <li>
                <Link
                  href='/register'
                  className='flex items-center mt-5 transition-transform transform hover:translate-x-2'
                >
                  <AiOutlineUserAdd size={26} />
                  <span className='hidden nav-item-name'>REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;

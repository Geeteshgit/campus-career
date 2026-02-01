"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoBookOutline, IoClose, IoMenuOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { FiBriefcase, FiUser } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { useAppSelector } from "@/redux/hooks";
import { RxDashboard } from "react-icons/rx";
import { TbWand } from "react-icons/tb";

type NavLink = {
  link: string;
  href: string;
  icon: React.ReactNode;
};

const Navbar = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const user = useAppSelector((state) => state.user.user);
  const role = user?.role;

  const studentLinks: NavLink[] = [
    {
      link: "Postings",
      href: "/postings",
      icon: <FiBriefcase className="w-4 h-4" />,
    },
    {
      link: "Recommendations",
      href: "/student/recommendations",
      icon: <TbWand className="w-4 h-4" />,
    },
    {
      link: "Prepare",
      href: "/student/prepare",
      icon: <IoBookOutline className="w-4 h-4" />,
    },
    {
      link: "Chat",
      href: "/chat",
      icon: <BiComment className="w-4 h-4" />,
    },
    {
      link: "Profile",
      href: "/student/profile",
      icon: <FiUser className="w-4 h-4" />,
    },
  ];

  const adminLinks: NavLink[] = [
    {
      link: "Dashboard",
      href: "/admin/dashboard",
      icon: <RxDashboard className="w-4 h-4" />,
    },
    { 
      link: "Chat", 
      href: "/chat", 
      icon: <BiComment className="w-4 h-4" /> 
    },
    {
      link: "Profile",
      href: "/admin/profile",
      icon: <FiUser className="w-4 h-4" />,
    },
  ];

  const navLinks: NavLink[] = role === "student" ? studentLinks : adminLinks;

  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow-sm z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="h-8 sm:h-10 w-auto"
            priority
          />
          <h1 className="text-lg sm:text-xl font-bold text-blue-500">
            CampusCareer
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-8 text-neutral-800 font-medium">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <li key={link.link}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 transition-colors ${
                    isActive
                      ? "text-blue-500 font-semibold"
                      : "hover:text-blue-500"
                  }`}
                >
                  {link.icon}
                  {link.link}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu */}
        <button
          className="lg:hidden text-neutral-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose size={28} /> : <IoMenuOutline size={28} />}
        </button>
      </nav>

      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-200">
          <ul className="flex flex-col items-center py-4 gap-4 text-neutral-700 font-medium">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <li key={link.link}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 transition-colors ${
                      isActive
                        ? "text-blue-500 font-semibold"
                        : "hover:text-blue-500"
                    }`}
                  >
                    {link.icon}
                    {link.link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

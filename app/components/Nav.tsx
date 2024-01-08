"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// import classnames from 'classnames'

const logoSrc = "/CapTechBg.png";
const plusIcon = "/plus.png";

type LinkItem = {
  href: string;
  label: string;
};

const Navbar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const links: LinkItem[] = [
    { href: "/", label: "Home" },
    { href: "/pages/users", label: "Users" },
    { href: "/pages/new", label: "Add Users" },
  ];

  return (
    <>
      <nav className="bg-black text-white p-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src={logoSrc}
              alt="Logo"
              width={220}
              height={120}
              className="rounded-full"
            />
          </div>

          {/* Links */}
          <ul className="flex space-x-4">
            {links.map((link) => (
              <li
                key={link.href}
                className="flex items-center space-x-2 hover:bg-[#124366] hover:rounded-md p-2"
              >
                {/* Tenary condition  */}
                <Link
                  className={`${
                    link.href === currentPath
                      ? "text-blue-500"
                      : "text-blue-900"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>

                {/*  Classes method */}
                {/* <Link
                  className={classnames({
                    "text-blue-900": link.href === currentPath,
                    "text-blue-500": link.href !== currentPath,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link> */}

                {/* plus icon */}
                <Image
                  src={plusIcon}
                  alt="Plus Icon"
                  width={20}
                  height={20}
                  className="transition-transform transform hover:scale-150"
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useRouter } from "next/router";
import trans from "../locale/locale.json";
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import Logo from "./Logo";
import { AiOutlineClose } from "react-icons/ai";

function MinNav() {
  const [isMenuOpen, setMenuIsOpen] = useState(false);
  const { locale, locales, asPath } = useRouter();
  return (
    <nav className=" w-full flex justify-between items-center  lg:hidden">
      <Logo />
      <div>
        {locales
          .filter((lan) => lan === locale)
          .map((lan) => {
            const isAr = lan === "ar";
            return (
              <Link href={asPath} locale={isAr ? "en" : "ar"}>
                <a
                  style={
                    locale !== "ar"
                      ? {
                          fontFamily: "Cairo, sans-serif",
                        }
                      : {}
                  }
                  className="me-10 text-sm"
                >
                  {isAr ? "English" : "العربية"}
                </a>
              </Link>
            );
          })}
      </div>
      <div className="flex items-center">
        {isMenuOpen ? (
          <>
            <AiOutlineClose
              className="text-3xl"
              onClick={() => setMenuIsOpen(!isMenuOpen)}
            />
            <ul
              className="p-4 bg-gray-900  shadow-md
                            w-screen min-h-screen text-center pt-24  z-50 absolute end-0 top-24"
              id="pop"
            >
              <li
                className="p-4 text-center text-lg font-medium "
                onClick={() => setMenuIsOpen(false)}
              >
                <Link href="/blog">
                  <a>{trans[locale].header.blogs}</a>
                </Link>
              </li>
              <li
                className="p-4 text-center text-lg font-medium"
                onClick={() => setMenuIsOpen(false)}
              >
                <Link href="/projects">
                  <a>{trans[locale].header.projects}</a>
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <HiOutlineMenu
              className="text-3xl"
              onClick={() => setMenuIsOpen(!isMenuOpen)}
            />
          </>
        )}
      </div>
    </nav>
  );
}

export default MinNav;

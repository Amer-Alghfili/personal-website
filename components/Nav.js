import React, { Fragment } from "react";
import trans from "../locale/locale.json";
import Logo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiChevronDown } from "react-icons/bi";
import { Menu, Transition } from "@headlessui/react";
import { BiNetworkChart } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";

function Nav() {
  const { locale, locales, asPath } = useRouter();
  return (
    <nav className=" w-5/6 hidden lg:flex items-center justify-between text-lg">
      <ul className="align-center flex gap-6 items-center justify-center">
        <li className="align-center flex cursor-pointer">
          <Link href="/">
            <Logo />
          </Link>
        </li>
      </ul>
      <ul className="  align-center justify-center  flex  items-center ">
        <li>
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
        </li>
        <li
          className="align-center ms-8 flex hover:border-2 border-purple-600 transition 
                duration-300 ease-in-out cursor-pointer"
        >
          <Link href="/blog">
            <a>{trans[locale].header.blogs}</a>
          </Link>
        </li>
        <li
          className="align-center flex ms-8 hover:border-2 border-purple-600 
                transition duration-300 ease-in-out cursor-pointer"
        >
          <Link href="/projects">
            <a>{trans[locale].header.projects}</a>
          </Link>
        </li>
        <li
          className="align-center flex ms-8 hover:border-2 border-purple-600 
                transition duration-300 ease-in-out cursor-pointer"
        >
          <Link href="/books">
            <a>{trans[locale].header.books}</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

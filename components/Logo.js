import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import trans from "../locale/locale.json";

function Logo() {
  const { locale } = useRouter();
  return (
    <Link href="/">
      <a className="flex items-center justify-center relative xl:text-xl font-semibold">
        {trans[locale].header.icon}
      </a>
    </Link>
  );
}

export default Logo;

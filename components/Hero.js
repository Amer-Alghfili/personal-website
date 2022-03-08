import React from "react";
import { useRouter } from "next/router";
import trans from "../locale/locale.json";

function Hero() {
  const { locale } = useRouter();
  return (
    <section className="h-lgg flex justify-center xl:items-center w-full p-10">
      <div className="md:5/6 xl:w-4/6 flex flex-col gap-6 xl:flex-row xl:justify-center items-center xl:text-start text-start ">
        <img
          src={require("../assets/images/me.jpg")}
          alt="Personal avatar"
          className="w-60 h-60 md:w-72 md:h-72 rounded-lg xl:ms-10"
        />
        <hgroup className="w-full mt-10 xl:mt-0">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-indigo-600">
            {trans[locale].heroTitle} <span className="text-white">👋</span>
          </h1>
          <h2 className="xl:w-full text-lg mt-4">
            {trans[locale].hero}
            <a
              className="underline"
              href="https://www.youtube.com/channel/UCpyen0FpiP1bO3y9ykrUbZQ"
              target="_blank"
            >
              {trans[locale].here}
            </a>
            📺
          </h2>
        </hgroup>
      </div>
    </section>
  );
}

export default Hero;

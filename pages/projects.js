import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import trans from "../locale/locale.json";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FiSend } from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";
import Prismic from "prismic-javascript";
import { client } from "../prismic-configuration";

function projects() {
  const { locale } = useRouter();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function fetchProjectsEffect() {
      function fetchProjects() {
        client
          .query([Prismic.Predicates.at("document.type", "projects")], {
            lang: locale === "ar" ? "ar-sa" : "en-us",
          })
          .then(({ results }) => {
            setIsLoading(false);
            if (locale === "ar") {
              results.reverse();
            }
            setResult(results);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      fetchProjects();
    },
    [locale]
  );

  const renderedResult = result?.map((res) => {
    const { name, description, img } = res.data;
    const { url: githubLink } = res.data["github-link"];
    const { url: visitLink } = res.data["visit-link"];
    console.log(res.data);
    const { text: projectName } = name[0];
    const { text: projectDescription } = description[0];
    const { url, alt } = img;
    return (
      <section
        key={name}
        className="relative flex justify-center mt-4 w-full p-4 xl:p-0 xl:w-lggg rounded-lg"
      >
        <img src={url} alt={alt} className="h-full w-full xl:block hidden" />
        <div
          className={`relative xl:absolute xl:top-1/2 xl:end-16 transform ${
            locale === "ar" ? "xl:-translate-x-2/4" : "xl:translate-x-2/4"
          } xl:-translate-y-2/4  w-full xl:w-96 bg-gray-800 
                    rounded-xl shadow-2xl p-6 text-start`}
        >
          <h1 className="font-bold text-3xl mb-4">{projectName}</h1>
          <p className="text-base text-gray-200 block ">{projectDescription}</p>
          <div className="flex gap-4 mt-8">
            <a
              href={visitLink}
              className="p-2 pe-4 ps-4 rounded-md bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center ms-4"
              target="_blank"
            >
              <FiSend className="me-2" />
              <span>{trans[locale].projectPage.visit}</span>
            </a>
            <a
              href={githubLink}
              className="p-2 pe-4 ps-4 rounded-md bg-gray-900 flex items-center "
              target="_blank"
            >
              <AiFillGithub className="me-2" />
              <span>Github</span>
            </a>
          </div>
        </div>
      </section>
    );
  });

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={locale === "ar" ? { fontFamily: "Cairo, sans-serif" } : {}}
    >
      <Head>
        <title>{trans[locale].titles.projects}</title>
        <meta name="description" content="Amer Alghfaili personal website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Montserrat:ital,wght@0,100;0,400;1,100&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com/%22%3E" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <main className=" flex flex-col  items-center text-center min-h-screen pt-10 xl:pt-20">
        <section className="block ">
          <h1 className="text-center text-5xl font-bold relative my-8">
            {trans[locale].projectPage.myProjects}
            <div
              className="h-3 w-full absolute -bottom-2 start-0 bg-indigo-500 transform
                -rotate-1 opacity-40 transition duration-300"
            ></div>
          </h1>
        </section>
        {isLoading ? (
          <div className="w-full p-10 xl:w-4/6 flex justify-between items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>{renderedResult}</>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default projects;

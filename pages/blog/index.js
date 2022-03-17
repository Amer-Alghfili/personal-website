import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import trans from "../../locale/locale.json";
import Prismic from "prismic-javascript";
import { AiOutlineSearch } from "react-icons/ai";
import { client } from "../../prismic-configuration";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Input from "../../components/Input";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Stack, Skeleton, SkeletonText, Box } from "@chakra-ui/react";

function blog() {
  const [term, setTerm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const { locale } = useRouter();

  useEffect(() => {
    searchTerm();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchTerm();
    }, 300);
    return () => clearTimeout(timer);
  }, [term]);

  const searchTerm = async () => {
    setIsLoading(true);
    if (term) {
      await client
        .query([
          Prismic.Predicates.at("document.type ", "post"),
          Prismic.Predicates.fulltext("document", term),
        ])
        .then((res) => {
          setIsLoading(false);
          setResult(res.results);
        });
    } else {
      client
        .query([Prismic.Predicates.at("document.type", "post")], {
          lang: locale === "ar" ? "ar-sa" : "en-us",
        })
        .then(({ results }) => {
          setIsLoading(false);
          setResult(results);
        })
        .catch((err) => {});
    }
  };

  useEffect(
    function fetchBlogsEffect() {
      function fetchBlogs() {
        client
          .query([Prismic.Predicates.at("document.type", "post")], {
            lang: locale === "ar" ? "ar-sa" : "en-us",
          })
          .then(({ results }) => {
            setIsLoading(false);
            setResult(results);
          })
          .catch((err) => {});
      }
      fetchBlogs();
    },
    [locale]
  );

  const renderedResult = result?.map((res) => {
    const { uid } = res;
    const { release_date, title, body } = res.data;
    const { primary } = body[0];
    const { text } = primary;
    return (
      <li className="w-full" key={uid}>
        {/* <Link href={`/blog/${uid}`}> */}
        <Link href={`/blog/loading?name=${uid}`}>
          <a className="p-4 py-12 md:p-12 md:pb-16 bg-gray-800 w-full mb-6 overflow-ellipsis block shadow-md rounded-lg">
            <div className="flex items-center flex-wrap justify-between mb-4">
              <div className="text-sm text-gray-300">{release_date}</div>
            </div>
            <div>
              <h1 className="font-bold text-3xl mb-4 ">{title[0].text}</h1>
              <p className="w-full h-full md:block  overflow-hidden text-gray-300">
                {text[0].text.length > 50
                  ? text[0].text.substring(0, 200) + " ..."
                  : text[0].text}{" "}
              </p>
            </div>
          </a>
        </Link>
      </li>
    );
  });

  return (
    <>
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        style={locale === "ar" ? { fontFamily: "Cairo, sans-serif" } : {}}
      >
        <Head>
          <title>{trans[locale].titles.blogs}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Montserrat:ital,wght@0,100;0,400;1,100&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com/%22%3E" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com/"
            crossorigin
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />
        <main className="min-h-screen mb-10 ">
          <section className=" flex flex-col  items-center">
            <h1 className="text-center text-5xl font-bold relative">
              {trans[locale].blogPage.myBlogs}
              <div
                className="h-3 w-full absolute -bottom-2 start-0 bg-indigo-500 transform
                -rotate-1 opacity-40 transition duration-300"
              ></div>
            </h1>
          </section>
          <section className="flex justify-center mt-4 xl:mt-10 ">
            <div className="p-2 w-full xl:w-4/6 flex text-center flex-wrap justify-center xl:justify-between items-center">
              <div className="w-full">
                <Input
                  id="search-input"
                  className="hidden lg:block"
                  placeholder={trans[locale].searchPlaceholder}
                  fullWidth
                  icon={<AiOutlineSearch />}
                  styles="bg-gray-800"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
              </div>
            </div>
          </section>
          <section className="mt-2 xl:mt-10 flex justify-center ">
            <ul className="w-full p-2 xl:w-4/6">
              {isLoading
                ? [
                    <Stack>
                      <Box className="p-4 py-12 md:p-12 md:pb-16 bg-gray-800 w-full mb-6 overflow-ellipsis block shadow-md rounded-lg">
                        <SkeletonText my="7" noOfLines={1} spacing="4" />
                        <Skeleton height="1rem" />
                        <SkeletonText my="7" noOfLines={2} spacing="4" />
                      </Box>
                    </Stack>,
                    <Stack>
                      <Box className="p-4 py-12 md:p-12 md:pb-16 bg-gray-800 w-full mb-6 overflow-ellipsis block shadow-md rounded-lg">
                        <SkeletonText my="7" noOfLines={1} spacing="4" />
                        <Skeleton height="1rem" />
                        <SkeletonText my="7" noOfLines={2} spacing="4" />
                      </Box>
                    </Stack>,
                  ]
                : renderedResult}
            </ul>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default blog;

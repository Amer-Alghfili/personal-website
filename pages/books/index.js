import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import trans from "../../locale/locale.json";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Prismic from "prismic-javascript";
import { client } from "../../prismic-configuration";
import { ImPencil2 } from "react-icons/im";
import { Skeleton, Stack, SkeletonText } from "@chakra-ui/react";

function BooksPage() {
  const { locale } = useRouter();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function fetchBooksEffect() {
      function fetchBooks() {
        client
          .query([Prismic.Predicates.at("document.type", "book")])
          .then(({ results }) => {
            setIsLoading(false);
            setResult(results);
          })
          .catch((err) => {});
      }
      fetchBooks();
    },
    [locale]
  );

  const renderedResult = result?.map((res) => {
    const { uid, data } = res;
    const { name, author, img } = data;
    const { text: bookName } = name[0];
    const { text: authorName } = author[0];
    const { url, alt } = img;
    return (
      <Link key={name} href={`/books/${uid}`}>
        <a>
          <article className="p-4 bg-gray-800">
            <img src={url} alt={alt} className="block rounded-xl w-full" />
            <div className="text-center my-6">
              <h1 className="font-bold text-3xl mb-4">{bookName}</h1>
              <div dir="ltr" className="flex justify-center items-center gap-3">
                <ImPencil2 />
                <span className="text-md">{authorName}</span>
              </div>
            </div>
          </article>
        </a>
      </Link>
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
      <main className="flex flex-col items-center text-center min-h-screen pt-10 xl:pt-20">
        <section className="">
          <h1 className="text-center text-5xl font-bold relative my-8">
            {trans[locale].booksPage.title}
            <div
              className="h-3 w-full absolute -bottom-2 start-0 bg-indigo-500 transform
                -rotate-1 opacity-40 transition duration-300"
            ></div>
          </h1>
          <h2 className="text-2xl">{trans[locale].booksPage.subTitle}</h2>
        </section>
        <div className="books w-full p-8">
          {isLoading
            ? [
                <Stack>
                  <Skeleton my="4" height="8rem" />
                  <SkeletonText noOfLines={2} spacing="4" />
                </Stack>,
                <Stack>
                  <Skeleton my="4" height="8rem" />
                  <SkeletonText noOfLines={2} spacing="4" />
                </Stack>,
                <Stack>
                  <Skeleton my="4" height="8rem" />
                  <SkeletonText noOfLines={2} spacing="4" />
                </Stack>,
              ]
            : renderedResult}
        </div>
      </main>
    </div>
  );
}

export default BooksPage;

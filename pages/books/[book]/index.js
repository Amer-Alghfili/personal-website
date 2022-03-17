import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import trans from "../../../locale/locale.json";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Prismic from "prismic-javascript";
import { client } from "../../../prismic-configuration";
import { Skeleton, Stack, SkeletonText } from "@chakra-ui/react";

function BookPage() {
  const [result, setResult] = useState([]);
  const [bookInfo, setBookInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {
    locale,
    query: { book },
  } = useRouter();

  useEffect(
    function fetchChaptersEffect() {
      setIsLoading(true);
      async function fetchChapters() {
        if (book) {
          client
            .query([Prismic.Predicates.at("my.book.uid", book)], {
              lang: locale === "ar" ? "ar-sa" : "en-us",
            })
            .then(({ results }) => {
              setBookInfo(results[0].data);
              const { id } = results[0];
              return client.query(
                [Prismic.Predicates.at("my.cha.bookuid", id)],
                {
                  lang: locale === "ar" ? "ar-sa" : "en-us",
                }
              );
            })
            .then(({ results }) => {
              const sortedChaptersByChapterNumber = [...results].sort(
                function sortChapters(a, b) {
                  return a.data.chapternumber < b.data.chapternumber ? -1 : 1;
                }
              );
              setResult(sortedChaptersByChapterNumber);
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
            });
        }
      }
      fetchChapters();
    },
    [locale, book]
  );

  const renderedResult = result?.map((res, index) => {
    const { uid, data } = res;
    const { title, body } = data;
    const {
      primary: { text },
    } = body[0];

    return (
      <li className="w-full" key={uid}>
        {/* <Link href={`/books/${book}/loading?name=${uid}`}> */}
        <Link href={`/books/${book}/${uid}`}>
          <a className="relative px-8 py-12 bg-gray-800 w-full mb-6 overflow-ellipsis block rounded-lg">
            <span className="italic absolute end-0 sm:top-4 top-6 text-8xl sm:text-9xl text-gray-200 opacity-5">
              #CH{index + 1}
            </span>
            <div>
              <h3 className="font-bold text-xl xl:text-3xl mb-4 ">
                {title[0].text}
              </h3>
              <p className="w-full h-full md:block overflow-hidden text-gray-300">
                {text[0].text.substring(0, 200) + " ..."}
              </p>
            </div>
          </a>
        </Link>
      </li>
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
      <main>
        <section className="p-3">
          {isLoading ? (
            <Skeleton width="320px" height="400px" mt="4rem" m="auto" />
          ) : (
            <div className="relative w-full flex justify-center items-center">
              <div className="absolute top-3/4 start-0 end-0 -z-10 h-1 bg-white"></div>
              <div className="mt-16 border-4 border-white p-3 rounded-xl bg-black w-72 sm:w-auto">
                <img
                  className="rounded-lg"
                  src={bookInfo.img.chapterPageImg.url}
                  alt={bookInfo.img.alt}
                />
              </div>
            </div>
          )}
          <div className="text-center">
            {isLoading ? (
              <Stack align="center">
                <Skeleton mt="8" mb="2" width="30%" height="2rem" />
                <Skeleton width="50%" height="1rem" />
                <Skeleton width="50%" height="1rem" />
              </Stack>
            ) : (
              <>
                <h1 className="font-bold text-3xl md:text-5xl my-8">
                  {bookInfo.name[0].text}
                </h1>
                <div className="text-2xl w-3/4 m-auto">
                  {bookInfo.description[0].text}
                </div>
              </>
            )}
          </div>
          <section className="w-full p-8">
            <h2 className="text-3xl font-bold my-8">
              {trans[locale].booksPage.bookChapters}
            </h2>
            {isLoading ? (
              <Stack>
                <Skeleton width="100%" height="6rem" mb="1.5rem" />
                <Skeleton width="100%" height="6rem" />
              </Stack>
            ) : (
              <ul>{renderedResult}</ul>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

export default BookPage;

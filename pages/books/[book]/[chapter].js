import React, { useEffect, useState } from "react";
import Head from "next/head";
import trans from "../../../locale/locale.json";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Prismic from "prismic-javascript";
import { client } from "../../../prismic-configuration";
import Post from "../../../components/Post";
import { useRouter } from "next/router";

function BookPage({ post }) {
  const { locale } = useRouter();
  if (!post) {
    return (
      <div>
        <Header />
        <main className="flex justify-center min-h-screen pt-10 xl:pt-20">
          <h1 className="font-bold text-2xl">This post doesn't exist 😢</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const { query } = useRouter();
  const { id } = query;
  const { title, body } = post.data;
  return (
    <>
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        style={locale === "ar" ? { fontFamily: "Cairo, sans-serif" } : {}}
      >
        <Head>
          <title>{title}</title>
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
        <main className="flex justify-center min-h-screen pt-10 xl:pt-20">
          <Post title={title} content={body} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.chapter;
  try {
    const post = await client.getByUID("cha", id, {
      lang: context.locale === "ar" ? "ar-sa" : "en-us",
    });
    return {
      props: {
        post: post || null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}

export default BookPage;

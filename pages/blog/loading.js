import { useState } from "react";
import { Skeleton, Stack, SkeletonText } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function BlogLoading() {
  const router = useRouter();
  const {
    locale,
    query: { name },
  } = router;

  useState(function redirectToChapterEffect() {
    router.replace(`/blog/${name}`);
  });

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={locale === "ar" ? { fontFamily: "Cairo, sans-serif" } : {}}
    >
      <Head>
        {/* <title>{trans[locale].titles.projects}</title> */}
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
        <div className="w-full p-8">
          <Stack>
            <Skeleton my="12" width="100%" height="13rem" />
            <Skeleton my="12" width="20%" height="2rem" />
            <Skeleton my="12" width="80%" height="1.5rem" />
            <Skeleton my="12" width="80%" height="1.5rem" />
            <Skeleton my="12" width="80%" height="1.5rem" />
            <Skeleton my="12" width="80%" height="1.5rem" />
          </Stack>
        </div>
      </main>
    </div>
  );
}

export default BlogLoading;

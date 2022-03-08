import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { useRouter } from "next/router";
import trans from "../locale/locale.json";

export default function Home() {
  const { locale } = useRouter();
  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={locale === "ar" ? { fontFamily: "Cairo, sans-serif" } : {}}
    >
      <Head>
        <title>{trans[locale].titles.home}</title>
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
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

import "../styles/globals.css";
import "./index.css";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "bg-gray-900",
        color: "text-white",
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

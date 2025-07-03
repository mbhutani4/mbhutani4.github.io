import { useEffect } from "react"
import type { AppProps } from "next/app";
import Head from "next/head";
import "styles/globals.css";
import "styles/theme.css";
import ReactGA from "react-ga4";

ReactGA.initialize("G-NQRF4J353G");

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
     ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;

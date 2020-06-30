import "tachyons";
import "../node_modules/highlight.js/styles/tomorrow-night-eighties.css";
import { FC } from "react";
import { AppProps } from "next/app";
import { Header } from "../components/header";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <section className={`w-100 mw8 center bg-white`}>
        <Component {...pageProps} />
      </section>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          height: 100%;
          line-height: 1.8rem;
          font-weight: 400;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          color: #383838;
        }

        body {
          overflow-x: hidden;
        }

        h1 {
          line-height: 2.5rem;
        }

        a {
          color: #356d5f;
        }

        #__next {
          min-height: 100%;
          overflow-x: hidden;
        }

        /* colors */
        .bg-dark1 {
          background-color: #383838;
        }

        .dark1 {
          color: #383838;
        }

        .bg-darkTransparent1 {
          background: rgba(0, 0, 0, 0.3);
        }

        .light1 {
          color: #fff;
        }

        .color-lets-garden {
          color: #60c1a9;
        }

        .shadow-1-hover:hover {
          box-shadow: 0 0 20px #e8e8e8;
        }
      `}</style>
    </>
  );
};

export default App;

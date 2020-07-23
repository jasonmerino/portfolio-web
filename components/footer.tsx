import React from "react";
import Link from "next/link";
import { twitterUrl, githubUrl, linkedinUrl, devToUrl } from "../utils/social";

export const Footer = () => {
  return (
    <>
      <footer>
        <div className="mw8 center flex-ns flex-row-ns">
          <div className="pa3 pb2 f6 flex flex-row items-center">
            <span className="greeting">Let's connect! 👉🏼</span>
            <a href={linkedinUrl}>
              <img
                src="/linkedin.svg"
                height="28"
                width="28"
                alt="Image of LinkedIn icon"
              />
            </a>

            <a href={twitterUrl}>
              <img
                src="/twitter.svg"
                height="28"
                width="28"
                alt="Image of Twitter icon"
              />
            </a>

            <a href={githubUrl}>
              <img
                src="/github.svg"
                height="28"
                width="28"
                alt="Image of Github icon"
              />
            </a>

            <a href={devToUrl}>
              <img
                src="/dev-to.svg"
                height="28"
                width="28"
                alt="Image of Dev.to icon"
              />
            </a>
          </div>
        </div>
      </footer>
      <style jsx>{`
        footer {
          margin: 1rem 0 3rem;
        }
        a {
          padding: 0 0.5rem;
          display: flex;
          align-self: center;
        }
        .greeting {
          font-weight: bold;
          background-color: #60c1a9;
          padding: 0 1rem;
          border-radius: 3rem;
          color: #fff;
        }
      `}</style>
    </>
  );
};

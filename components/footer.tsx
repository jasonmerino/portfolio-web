import React from "react"
import Link from "next/link"
import { twitterUrl, githubUrl, linkedinUrl, devToUrl } from "../utils/social"

export const Footer = () => {
  return (
    <footer className="bg-dark1 mt3">
      <div className="mw8 center flex-ns flex-row-ns">
        <div className="w-100 w-40-m w-20-l white">
          <div className="pa3 f6">
            <Link href="/">
              <span className="white">
                Jason Merino
              </span>
            </Link>{" "}
            © {new Date().getFullYear()}
          </div>
        </div>
        <div className="w-100 w-60-m w-80-l self-end">
          <div className="pa3 pb2 f6 flex flex-row items-end">
            <a href={linkedinUrl} className="ph2 white">
              <img
                src="/linkedin.svg"
                height="28"
                width="28"
                alt="Image of LinkedIn icon"
              />
            </a>
            |
            <a href={twitterUrl} className="ph2 white">
              <img
                src="/twitter.svg"
                height="28"
                width="28"
                alt="Image of Twitter icon"
              />
            </a>
            |
            <a href={githubUrl} className="ph2 white">
              <img
                src="/github.svg"
                height="28"
                width="28"
                alt="Image of Github icon"
              />
            </a>
            |
            <a href={devToUrl} className="ph2 white">
              <img
                src="/dev-to.svg"
                height="28"
                width="28"
                alt="Image of Dev.to icon"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
import React, { FC } from "react";
import { twitterUrl, githubUrl } from "../utils/social";

export const Author: FC = () => {
  return (
    <section className="pa3 w-100 w-70-l center-l">
      <div className="w-30 center fl-l w-20-m w-20-l">
        <img
          src="/images/author-image.png"
          className="mv4 br-100 h-100 w-100 h-80-m h-80-l w-80-m w-80-l dib"
          alt="The author, Jason Merino, with sun glasses and a hat"
        />
      </div>
      <div className="w-100 fl-l w-80-l">
        <p className="b tc tl-l">Jason Merino 💻 🚀</p>
        <p>
          Software engineer, TypeScript enthusiast, avid gardener, all around
          family man, Franciscan at heart, celiac, aphantasiac. I enjoy nature
          and a good technical manual.
        </p>
        <p>
          Follow me on{" "}
          <a href={twitterUrl} target="new">
            Twitter
          </a>{" "}
          and checkout my code on{" "}
          <a href={githubUrl} target="new">
            Github
          </a>
          !
        </p>
      </div>
      <div className="cf" />
    </section>
  );
};

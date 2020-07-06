import fs from "fs";
import { GetStaticPaths } from "next";
import Head from "next/head";
import { FC } from "react";
import { config } from "../config";
import { parseMarkdownFile } from "../utils/markdown";

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesDir = fs.readdirSync("./content/pages");
  return {
    paths: pagesDir.map((page) => {
      const { data } = parseMarkdownFile(`./content/pages/${page}`);
      return data.path;
    }),
    fallback: false,
  };
};

export const getStaticProps = (context) => {
  const {
    htmlContent,
    data: { title, metaDescription, metaTitle, path },
  } = parseMarkdownFile(`./content/pages/${context.params.page}.md`);
  return {
    props: {
      path,
      htmlContent,
      title,
      metaDescription,
      metaTitle,
    },
  };
};

interface Props {
  path: string;
  htmlContent: string;
  title: string;
  metaDescription: string;
  metaTitle: string;
}

const PageTemplate: FC<Props> = ({
  htmlContent,
  title,
  path,
  metaTitle,
  metaDescription,
}) => {
  const url = `${config.topLevelDomain}${path}`;
  return (
    <>
      <Head>
        <title>{metaTitle} | Jason Merino (.me)</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:site_name" content="JasonMerino.me" />
        <meta
          property="og:image"
          content={`${config.topLevelDomain}/default-og-image.png`}
        />
      </Head>
      <div className="ph3">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </>
  );
};

export default PageTemplate;

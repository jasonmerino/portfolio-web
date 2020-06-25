import fs from "fs";
import { GetStaticPaths } from "next";
import matter from "gray-matter";
import marked from "marked";
import Head from "next/head";
import { FC } from "react";

const getPageData = (page: string) => {
  const markdown = fs.readFileSync(`./content/pages/${page}`, "utf-8");
  const { content, data } = matter(markdown);
  return { data, content };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesDir = fs.readdirSync("./content/pages");
  return {
    paths: pagesDir.map((page) => {
      const { data } = getPageData(page);
      return data.path;
    }),
    fallback: false,
  };
};

export const getStaticProps = (context) => {
  const {
    content,
    data: { title, metaDescription, metaTitle, path },
  } = getPageData(`${context.params.page}.md`);
  return {
    props: {
      path,
      content,
      title,
      metaDescription,
      metaTitle,
    },
  };
};

interface Props {
  path: string;
  content: string;
  title: string;
  metaDescription: string;
  metaTitle: string;
}

const PageTemplate: FC<Props> = ({
  content,
  title,
  path,
  metaTitle,
  metaDescription,
}) => {
  return (
    <>
      <Head>
        <title>{metaTitle} | Jason Merino (.me)</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://jasonmerino.me${path}`} />
      </Head>
      <div>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
      </div>
    </>
  );
};

export default PageTemplate;

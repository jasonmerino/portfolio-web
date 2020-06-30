import fs from "fs";
import { GetStaticPaths } from "next";
import Head from "next/head";
import { FC } from "react";
import { config } from "../../config";
import { parseMarkdownFile } from "../../utils/markdown";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { Code } from "../../components/code";

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDir = fs.readdirSync("content/articles");
  return {
    paths: articlesDir.map((article) => {
      const { data } = parseMarkdownFile(`content/articles/${article}`);
      return `/articles${data.path}`;
    }),
    fallback: false,
  };
};

export const getStaticProps = (context) => {
  const {
    content,
    data: { title, metaDescription, metaTitle, path, date },
  } = parseMarkdownFile(`content/articles/${context.params.article}.md`);
  return {
    props: {
      path,
      content,
      title,
      metaDescription,
      metaTitle,
      date,
    },
  };
};

interface Props {
  path: string;
  content: string;
  title: string;
  metaDescription: string;
  metaTitle: string;
  date: string;
}

const ArticleTemplate: FC<Props> = ({
  content,
  title,
  path,
  metaTitle,
  metaDescription,
  date,
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
      <article className="pa3 w-100 w-70-l center-l">
        <h1>{title}</h1>
        <strong>{moment(date, "YYYY-MM-DD").format("MMMM DD, YYYY")}</strong>
        <ReactMarkdown
          className="blog-post-content"
          source={content}
          renderers={{
            code: Code,
          }}
        />
      </article>
    </>
  );
};

export default ArticleTemplate;

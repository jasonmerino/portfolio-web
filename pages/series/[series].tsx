import { NextPage, GetStaticPaths } from "next";
import Head from "next/head";
import { config } from "../../config";
import fs from "fs";
import { parseMarkdownFile } from "../../utils/markdown";
import { ArticleMeta } from "../../types/article";
import { slugify } from "../../utils/string";

interface Props {
  title: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDir = fs.readdirSync("content/articles");
  const paths = [];
  articlesDir.map((article) => {
    const { data } = parseMarkdownFile<ArticleMeta>(
      `content/articles/${article}`
    );
    const path = `/series/${slugify(data.series)}`;
    if (data.series && !paths.includes(path)) {
      paths.push(path);
    }
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = (context) => {
  const {
    content,
    data: { series },
  } = parseMarkdownFile(`content/articles/${context.params.article}.md`);
  return {
    props: {
      title: series,
    },
  };
};

const Series: NextPage<Props> = ({ title }) => {
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
      </article>
    </>
  );
};

export default Series;

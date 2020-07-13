import { NextPage, GetStaticPaths } from "next";
import { getSeriesData, ArticleData } from "../../utils/files";
import Link from "next/link";
import Head from "next/head";
import { config } from "../../config";

interface Props {
  title: string;
  articles: ArticleData[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSeriesData().map((current) => {
    return {
      params: {
        id: current.path,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = (context) => {
  const { title, articles } = getSeriesData().find((current) => {
    return current.path === context.params.id;
  });
  const props: Props = {
    title,
    articles,
  };
  return {
    props,
  };
};

const Series: NextPage<Props> = ({ title, articles }) => {
  const { metaTitle, metaDescription, path } = articles[0].data;
  const url = `${config.topLevelDomain}/articles${path}`;
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
        <h1 className="pb3">Series: {title}</h1>
        {articles.map((article) => {
          return (
            <Link key={article.path} href={`/articles${article.data.path}`}>
              <div className="pb3 pointer">
                <h3>{article.data.title}</h3>
                <p>{article.data.metaDescription}</p>
              </div>
            </Link>
          );
        })}
      </article>
    </>
  );
};

export default Series;

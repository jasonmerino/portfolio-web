import { NextPage, GetStaticPaths } from "next";
import { getSeriesData, ArticleData } from "../../utils/files";
import Link from "next/link";
import { HTMLHead } from "../../components/html-head";

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
  return (
    <>
      <HTMLHead
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        canonical={`/articles${path}`}
      />
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

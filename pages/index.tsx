import Head from "next/head";
import { Button } from "../components/button";
import { BlogEntryTile } from "../components/blog-entry-tile";
import { ArticleMeta } from "../types/article";
import { NextPage } from "next";
import { ArticleSeriesTile } from "../components/article-series-tile";
import { getArticlesData, getSeriesData } from "../utils/files";

interface Props {
  articles: ArticleMeta[];
  series: string[];
}

export const getStaticProps = () => {
  const articles = getArticlesData();
  const series = getSeriesData();

  const props: Props = {
    articles: articles.map((article) => article.data),
    series: series.map((current) => current.title),
  };

  return {
    props,
  };
};

const Home: NextPage<Props> = ({ articles, series }) => {
  return (
    <>
      <div className="span4 container">
        <Head>
          <title>Jason Merino (.me)</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="dn db-ns">
          <div className="work-pager-background-ns" />
          <div className="work-page-ns">
            <div className="w-100 fl-ns w-30-ns pt4 mh-100">
              <img src="/images/lets-garden-app-journal-screen.png" />
            </div>
            <div className="w-100 fr-ns w-70-ns pl6">
              <p className="pt6 f3 b white">Recent Project:</p>
              <p className="f1 b white">Let's Garden</p>
              <p className="f3 white">A simple garden journal app for iOS.</p>
              <Button
                url={`/projects`}
                text={`Learn more...`}
                theme="light"
                className="mt3"
              />
            </div>
          </div>
        </div>
        <div className="db dn-ns">
          <img src="/images/lets-garden-app-journal-screen.png" />
          <div className={`work-page bg-white tc w-100`}>
            <p className="f3 b">Recent Project: Let's Garden</p>
            <p className="f5">A simple garden journal app for iOS.</p>
            <div className="mb3">
              <Button
                url={`/projects`}
                text={`Learn more...`}
                theme="dark"
                className="mt3"
              />
            </div>
          </div>
        </div>
        <h2 className="mt5 ml3">Recent Series</h2>
        {series.map((current) => {
          return <ArticleSeriesTile key={current} title={current} />;
        })}
        <h2 className="mt5 ml3">Recent Articles</h2>
        <div className="flex flex-row flex-wrap">
          {articles.map((article: ArticleMeta) => {
            const { title, draft, date, path, series } = article;
            if (draft || series) {
              return null;
            }
            return (
              <BlogEntryTile
                key={title}
                title={title}
                date={date}
                href={`/articles${path}`}
              />
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .work-pager-background-ns {
          height: 800px;
          background-color: #60c1a9;
          transform: rotate(-3deg);
          width: 200%;
          position: absolute;
          left: -50%;
          top: -200px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
          z-index: 0;
        }

        .work-page-ns {
          height: 600px;
          z-index: 1;
          overflow: hidden;
          position: relative;
        }

        .work-page {
          position: absolute;
          bottom: 10%;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
        }

        .entry-shadow {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
          border-radius: 5px;
        }

        .read-more {
          height: 5rem;
          background: linear-gradient(
            transparent,
            rgba(255, 255, 255, 0.7),
            rgba(255, 255, 255, 0.8),
            white,
            white
          );
        }
      `}</style>
    </>
  );
};

export default Home;

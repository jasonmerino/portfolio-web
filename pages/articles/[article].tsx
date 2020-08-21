import { GetStaticPaths } from "next";
import { FC } from "react";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { Code } from "../../components/code";
import { Author } from "../../components/author";
import { HTMLHead } from "../../components/html-head";
import { Pill } from "../../components/pill";
import { getArticlesData } from "../../utils/files";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getArticlesData().map((article) => {
      return `/articles${article.data.path}`;
    }),
    fallback: false,
  };
};

export const getStaticProps = (context) => {
  const {
    content,
    data: { path, metaDescription, metaTitle, title, date, tags },
  } = getArticlesData().find((article) => {
    return article.path === `${context.params.article}.md`;
  });
  return {
    props: {
      path,
      content,
      title,
      metaDescription,
      metaTitle,
      date,
      tags: tags || [],
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
  tags?: string[];
}

const ArticleTemplate: FC<Props> = ({
  content,
  title,
  path,
  metaTitle,
  metaDescription,
  date,
  tags,
}) => {
  return (
    <>
      <HTMLHead
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        canonical={path}
      />
      <article className="pa3 w-100 w-70-l center-l">
        <h1>{title}</h1>
        <div>
          <strong className="pr3">
            {moment(date, "YYYY-MM-DD").format("MMMM DD, YYYY")}
          </strong>
          {(tags || []).map((tag) => {
            return (
              <span className="ph2" key={tag}>
                <Pill>{tag}</Pill>
              </span>
            );
          })}
        </div>
        <ReactMarkdown
          className="blog-post-content"
          source={content}
          renderers={{
            code: Code,
          }}
        />
      </article>
      <Author />
    </>
  );
};

export default ArticleTemplate;

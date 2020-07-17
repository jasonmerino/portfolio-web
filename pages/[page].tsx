import fs from "fs";
import { GetStaticPaths } from "next";
import { FC } from "react";
import { parseMarkdownFile } from "../utils/markdown";
import { PageMeta } from "../types/page";
import { HTMLHead } from "../components/html-head";

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesDir = fs.readdirSync("./content/pages");
  return {
    paths: pagesDir.map((page) => {
      const { data } = parseMarkdownFile<PageMeta>(`./content/pages/${page}`);
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
  return (
    <>
      <HTMLHead
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        canonical={path}
      />
      <div className="ph3">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </>
  );
};

export default PageTemplate;

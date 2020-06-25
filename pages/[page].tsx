import fs from "fs";
import { GetStaticPaths } from "next";
import matter from "gray-matter";
import marked from "marked";

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
    data: { title, description },
  } = getPageData(`${context.params.page}.md`);
  return {
    props: {
      content,
      title,
      description,
    },
  };
};

export default (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(props.content) }} />
    </div>
  );
};

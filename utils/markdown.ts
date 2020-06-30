import fs from "fs";
import matter from "gray-matter";
import marked from "marked";

export const parseMarkdownFile = (page: string) => {
  const markdown = fs.readFileSync(page, "utf-8");
  const { content, data } = matter(markdown);
  return { data, content, htmlContent: marked(content) };
};

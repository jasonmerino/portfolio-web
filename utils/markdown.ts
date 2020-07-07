import fs from "fs";
import matter from "gray-matter";
import marked from "marked";

export const parseMarkdownFile = <T extends unknown>(page: string): {
    data: T;
    content: string;
    htmlContent: string;
} => {
  const markdown = fs.readFileSync(page, "utf-8");
  const { content, data } = matter(markdown);
  return { data: data as T, content, htmlContent: marked(content) };
};

import { parseMarkdownFile } from "./markdown";
import fs from "fs";
import { ArticleMeta } from "../types/article";
import { slugify } from "./string";

export interface ArticleData {
  path: string;
  data: ArticleMeta;
}

interface SeriesData {
  title: string;
  path: string;
  articles: ArticleData[];
}

export const getArticlesData = (): ArticleData[] => {
  const articlesDir = fs.readdirSync("content/articles");
  return articlesDir.map((article) => {
    const { data } = parseMarkdownFile<ArticleMeta>(
      `content/articles/${article}`
    );
    return {
      path: article,
      data,
    };
  });
};

export const getSeriesData = (): SeriesData[] => {
  const articles = getArticlesData();
  return articles.reduce((previous, current) => {
    if (!current.data.series) {
      return previous;
    }
    const index = previous.findIndex((item) => {
      return item.title === current.data.series;
    });
    if (index === -1) {
      previous.push({
        title: current.data.series,
        path: slugify(current.data.series),
        articles: [current],
      });
    } else {
      previous[index].articles.push(current);
    }
    return previous;
  }, [] as SeriesData[]);
};

import { parseMarkdownFile } from "./markdown";
import fs from "fs";
import { ArticleMeta } from "../types/article";
import { slugify } from "./string";

export interface ArticleData {
  path: string;
  content: string;
  data: ArticleMeta;
}

interface SeriesData {
  title: string;
  path: string;
  articles: ArticleData[];
}

export const getArticlesData = (): ArticleData[] => {
  const articlesDir = fs.readdirSync("content/articles");
  return articlesDir
    .map((article) => {
      const { data, content } = parseMarkdownFile<ArticleMeta>(
        `content/articles/${article}`
      );
      return {
        path: article,
        content,
        data,
      };
    })
    .sort((a, b) => {
      if (a.data.date < b.data.date) {
        return 1;
      }
      if (a.data.date > b.data.date) {
        return -1;
      }
      return 0;
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
      // assure that articles in a series are sorted by date
      previous[index].articles.sort((a, b) => {
        if (a.data.date < b.data.date) {
          return -1;
        }
        if (a.data.date > b.data.date) {
          return 1;
        }
        return 0;
      });
    }
    return previous;
  }, [] as SeriesData[]);
};

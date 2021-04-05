import { config } from "../config";
import { ArticleMeta } from "../types/article";

export async function generateRssItem(article: ArticleMeta) {
  return `
    <item>
      <guid>${config.topLevelDomain}/articles${article.path}</guid>
      <title>${article.title}</title>
      <description>${article.metaDescription}</description>
      <link>${config.topLevelDomain}/articles${article.path}</link>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      ${article.tags ? article.tags.map((tag) => {
        return `<category>${tag}</category>`;
      }).join(""): ''}
    </item>
  `;
}

export async function generateRss(articlesMeta: ArticleMeta[]) {
  const itemsList = await Promise.all(articlesMeta.map(generateRssItem));

  return `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
      <channel>
        <title>${config.siteTitle}</title>
        <link>${config.topLevelDomain}</link>
        <description>${config.siteSubTitle}</description>
        <language>en</language>
        <lastBuildDate>${new Date(
          articlesMeta[0].date
        ).toUTCString()}</lastBuildDate>
        <atom:link href="${
          config.topLevelDomain
        }/rss.xml" rel="self" type="application/rss+xml"/>
        ${itemsList.join("")}
      </channel>
    </rss>
  `;
}

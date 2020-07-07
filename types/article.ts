export interface ArticleMeta {
    type: 'article' | 'page';
    path: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    date?: string;
    draft?: boolean;
    twitterImage?: string;
    series?: string;
}
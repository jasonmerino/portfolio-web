import React, { FC } from "react";
import Head from "next/head";
import { config } from "../config";

interface Props {
  metaTitle: string;
  metaDescription: string;
  canonical: string;
}

export const HTMLHead: FC<Props> = ({
  metaTitle,
  metaDescription,
  canonical,
}) => {
  const fullCanonicalURL = config.topLevelDomain + canonical;
  return (
    <Head>
      <title>{metaTitle} | Jason Merino (.me)</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={fullCanonicalURL} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonicalURL} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content="JasonMerino.me" />
      <meta
        property="og:image"
        content={`${config.topLevelDomain}/default-og-image.png`}
      />
    </Head>
  );
};

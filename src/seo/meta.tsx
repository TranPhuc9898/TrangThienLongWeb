/** @format */

import React from "react";
type MetaParams = {
  title: string;
  description: string;
  canonicalUrl: string;
  absoluteImage: string;
  siteName: string;
  type: string;
  locale: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
  noIndex?: boolean;
  twitterHandle?: string;
};
export function generateMeta({
  title,
  description,
  canonicalUrl,
  absoluteImage,
  siteName,
  type,
  locale,
  datePublished,
  dateModified,
  author,
  keywords = [],
  noIndex = false,
  twitterHandle,
}: MetaParams) {
  return (
    <>
      {" "}
      {/* Basic Meta Tags */} <title>{title}</title>{" "}
      <meta name="description" content={description} />{" "}
      <meta name="viewport" content="width=device-width, initial-scale=1" />{" "}
      <link rel="canonical" href={canonicalUrl} /> {/* Keywords */}{" "}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}{" "}
      {/* Author */} {author && <meta name="author" content={author} />}{" "}
      {/* Open Graph */} <meta property="og:title" content={title} />{" "}
      <meta property="og:description" content={description} />{" "}
      <meta property="og:type" content={type} />{" "}
      <meta property="og:url" content={canonicalUrl} />{" "}
      <meta property="og:image" content={absoluteImage} />{" "}
      <meta property="og:image:width" content="1200" />{" "}
      <meta property="og:image:height" content="630" />{" "}
      <meta property="og:image:alt" content={title} />{" "}
      <meta property="og:locale" content={locale} />{" "}
      {siteName && <meta property="og:site_name" content={siteName} />}{" "}
      {/* Article specific OG tags */}{" "}
      {type === "article" && datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}{" "}
      {type === "article" && dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}{" "}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}{" "}
      {/* Twitter Card */}{" "}
      <meta name="twitter:card" content="summary_large_image" />{" "}
      <meta name="twitter:title" content={title} />{" "}
      <meta name="twitter:description" content={description} />{" "}
      <meta name="twitter:image" content={absoluteImage} />{" "}
      <meta name="twitter:image:alt" content={title} />{" "}
      {twitterHandle && (
        <meta name="twitter:site" content={`@${twitterHandle}`} />
      )}{" "}
      {/* Robots */}{" "}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />{" "}
      {/* Additional SEO tags */}{" "}
      <meta name="format-detection" content="telephone=no" />{" "}
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />{" "}
      {/* Favicon and icons */} <link rel="icon" href="/favicon.ico" />{" "}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />{" "}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />{" "}
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />{" "}
      <link rel="manifest" href="/site.webmanifest" />{" "}
    </>
  );
}

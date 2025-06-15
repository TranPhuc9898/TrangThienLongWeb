/** @format */

import Head from "next/head";
import { generateSchema } from "./schema";
import { generateMeta } from "./meta";

type SEOProps = {
  title: string;
  description: string;
  url: string;
  image: string;
  canonical?: string;
  siteName?: string;
  type?: "website" | "article" | "product";
  locale?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
  noIndex?: boolean;
  twitterHandle?: string;
};

export default function SEO({
  title,
  description,
  url,
  image,
  canonical,
  siteName = "Your Site Name",
  type = "website",
  locale = "vi_VN",
  datePublished,
  dateModified,
  author,
  keywords = [],
  noIndex = false,
  twitterHandle,
}: SEOProps) {
  const absoluteUrl = url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_SITE_URL}${url}`;
  const absoluteImage = image.startsWith("http")
    ? image
    : `${process.env.NEXT_PUBLIC_SITE_URL}${image}`;
  const canonicalUrl = canonical || absoluteUrl;
  const truncatedDescription =
    description.length > 160
      ? description.substring(0, 157) + "..."
      : description;

  const schemaData = generateSchema({
    type,
    title,
    description: truncatedDescription,
    canonicalUrl,
    absoluteImage,
    datePublished,
    dateModified,
    author,
  });

  return (
    <Head>
      {generateMeta({
        title,
        description: truncatedDescription,
        canonicalUrl,
        absoluteImage,
        siteName,
        type,
        locale,
        datePublished,
        dateModified,
        author,
        keywords,
        noIndex,
        twitterHandle,
      })}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
    </Head>
  );
}

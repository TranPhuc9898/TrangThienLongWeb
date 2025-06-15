/** @format */

type SchemaType = "website" | "article" | "product";

interface SchemaParams {
  type: SchemaType;
  title: string;
  description: string;
  canonicalUrl: string;
  absoluteImage: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

export function generateSchema({
  type,
  title,
  description,
  canonicalUrl,
  absoluteImage,
  datePublished,
  dateModified,
  author,
}: SchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type":
      type === "article"
        ? "Article"
        : type === "product"
        ? "Product"
        : "WebPage",
    name: title,
    headline: title,
    url: canonicalUrl,
    image: {
      "@type": "ImageObject",
      url: absoluteImage,
      width: 1200,
      height: 630,
    },
    description: description,
    ...(datePublished && { datePublished: datePublished }),
    ...(dateModified && { dateModified: dateModified }),
    ...(author && {
      author: {
        "@type": "Person",
        name: author,
      },
    }),
  };
}

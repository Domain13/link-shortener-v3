import React from "react";
import Head from "next/head";

export default function TestSeo() {
  return (
    <>
      <Head>
        <title>Test SEO</title>
        <meta
          name="description"
          content="This is about testing seo in Next.js"
        />
        <meta name="keywords" content="seo, next.js, react" />
        <meta name="author" content="Shanto" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div>
        <h1>Test SEO</h1>
      </div>
    </>
  );
}

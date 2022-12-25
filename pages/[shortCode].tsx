// COMPLETE

import dbConnect from "../lib/dbConnect";
import ShortUrl from "../models/ShortUrl";
import State from "../models/State";
import React from "react";

export default function redirector() {
  return <h1>Redirecting...</h1>;
}

export async function getServerSideProps(context) {
  const { shortCode } = context.query;

  await dbConnect();

  // Find the short url in the database
  // @ts-ignore
  const shortUrl = await ShortUrl.findOne({
    shortCode,
  });

  // If there is no short url with the given short url return 404.
  // TODO: Redirect to a errorPage included in the short url or
  if (!shortUrl) {
    return {
      notFound: true,
    };
  }

  // @ts-ignore
  const state = await State.findOne({});

  if (shortUrl.clicks >= 4) {
    if (state.shouldRedirectOnLimit === true) {
      return {
        // redirect to shortUrl.errorPage
        redirect: {
          destination: shortUrl.errorPage,
          permanent: true,
        },
      };
    }
  }

  // +1 to the clicks
  shortUrl.clicks += 1;
  await shortUrl.save();

  // Redirect to the original url
  return {
    redirect: {
      destination: shortUrl.originalUrl,
      permanent: true,
    },
  };
}

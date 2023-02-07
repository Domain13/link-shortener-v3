import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import State from "../models/State";
import dbConnect from "../lib/dbConnect";
import ShortUrl from "../models/ShortUrl";
import User from "../models/User";

export default function RedirectLandingPage({ host, youtubeToken }) {
  const router = useRouter();
  const { shortCode } = router.query;

  const link = `vnd.youtube://youtube.com/redirect?event=comments&redir_token=${youtubeToken}&q=${host}/red/${shortCode}&html_redirect=1&html_redirect=1`;

  return (
    <>
      <Head>
        <title>Join my profile</title>
      </Head>

      <div className="landing-page">
        <button
          className="btn btn-offer"
          onClick={() => {
            // redirect
            router.push(link);
          }}
        >
          Join Free
        </button>
        <img
          style={{
            width: "100%",
            borderRadius: "1.5rem",
            border: ".2rem solid #fff",
          }}
          src="snap-pic.webp"
          alt="snapchat"
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { shortCode } = context.query;

  await dbConnect();

  // @ts-ignore
  const state = await State.findOne({ shortCode });

  if (!state) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      host: context.req.headers.host,
      youtubeToken: state.youtubeToken,
      redirectPage: true,
    },
  };
}

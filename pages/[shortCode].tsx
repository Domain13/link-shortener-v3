import { useRouter } from "next/router";
import Head from "next/head";
import State from "../models/State";
import dbConnect from "../lib/dbConnect";
import Image from "next/image";
import SnapchatPic from "../public/snap-pic.webp";

export default function RedirectLandingPage({ host, youtubeToken }) {
  const router = useRouter();
  const { shortCode } = router.query;

  const link = `vnd.youtube://youtube.com/redirect?event=comments&redir_token=${youtubeToken}&q=${host}/red/${shortCode}&html_redirect=1&html_redirect=1`;

  return (
    <>
      <Head>
        <title>Join my profile</title>
      </Head>

      <div className="LandingPage">
        <button
          className="btn btn-offer"
          onClick={() => {
            // redirect
            router.push(link);
          }}
        >
          Join Free
        </button>
        <img src="snap-pic.webp" alt="snapchat" />
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

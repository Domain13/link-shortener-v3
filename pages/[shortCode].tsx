import { useRouter } from "next/router";
import Head from "next/head";
import State from "../models/State";
import dbConnect from "../lib/dbConnect";
import Image from "next/image";
import { useState } from "react";
// import SnapchatPic from "../public/snap-pic.webp";
import linkImg from "../public/link.png"

export default function RedirectLandingPage({ host, youtubeToken }) {
  const router = useRouter();
  const { shortCode } = router.query;
  const [outputMsg, setOutputMsg] = useState(`copy link`)

  const androidAppLink = `vnd.youtube://youtube.com/redirect?event=comments&redir_token=${youtubeToken}&q=${host}/red/${shortCode}&html_redirect=1&html_redirect=1`;
  const iosAppLink = `youtube://youtube.com/redirect?event=comments&redir_token=${youtubeToken}&q=${host}/red/${shortCode}&html_redirect=1&html_redirect=1`;
  const fallbackLink = `https://www.youtube.com/redirect?event=comments&redir_token=${youtubeToken}&q=${host}/red/${shortCode}&html_redirect=1&html_redirect=1`;

  const redirect = () => {
    if (typeof window !== "undefined") {
      // if mobile, redirect to youtube app
      // if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      //   window.location.href = appLink;
      //   window.setTimeout(function () {
      //     window.location.href = fallbackLink;
      //   }, 25);
      // } else {
      //   window.location.href = fallbackLink;
      // }

      if (/Android/i.test(navigator.userAgent)) {
        // Android
        window.location.href = androidAppLink;
        // window.location.href = `intent://${host}/red/${shortCode}#Intent;scheme=http;package=com.android.chrome;end`;

        // } else if (/iPhone/i.test(navigator.userAgent)) {
      } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // iOS
        window.location.href = iosAppLink;
        // window.location.href = `safari://${host}/red/${shortCode}`;
      } else {
        // fallback
        window.location.href = fallbackLink;
        // window.location.href = `intent://${host}/red/${shortCode}#Intent;scheme=http;package=com.android.chrome;end`;
        // window.location.href = `intent://${host}/red/${shortCode}#Intent;scheme=http;package=com.android.chrome;end`;
      }

      // // If the user doesn't have the app installed, we open the Play Store
      // setTimeout(function () {
      // window.location.href = fallbackLink;
      // }, 25);
    }
  };
  const copyLink = () => {
    navigator.clipboard.writeText(`${host}/red/${shortCode}`);

    setOutputMsg("Copied Successfully");
  }

  return (
    <>
      <Head>
        <title>Join my profile</title>
      </Head>

      <div className="LandingPage">
        <h2>Go to Personal Profile...</h2>

        <button className="btn btn-offer" onClick={redirect}>
          Click here
        </button>

        {/* Iphone notice  */}
        <div className="iphone-user">
          <p className="iphone-notice">If you can't enter the site copy the link from <span>"COPY LINK"</span> button and <span>Past</span> it to any browser</p>

          {/* copy link button  */}

          <button className="btn btn-copy" onClick={copyLink}>
            <Image className="link-img" src={linkImg} alt="link image" /> {outputMsg}
          </button>
        </div>
        {/* <Image src={SnapchatPic} alt="snapchat" /> */}
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

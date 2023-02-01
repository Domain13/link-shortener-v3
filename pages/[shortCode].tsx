import { useRouter } from "next/router";
import Head from "next/head";
import State from "../models/State";
import dbConnect from "../lib/dbConnect";
import { useEffect } from "react";

export default function RedirectLandingPage({ host, youtubeToken }) {
  const router = useRouter();
  const { shortCode } = router.query;

  // const link = `https://www.youtube.com/redirect?event=comments&redir_token=${youtubeToken}&q=${host}/red/${router.query.shortCode}&html_redirect=1`;
  // const link = `https://${host}/red/${router.query.shortCode}`;
  const link =
    "vnd.youtube://youtube.com/redirect?event=comments&redir_token=" +
    youtubeToken +
    "&q=" +
    host +
    "/red/" +
    router.query.shortCode +
    "&html_redirect=1" +
    "&html_redirect=1";

  // useEffect(() => {
  //   function killPopup() {
  //     window.removeEventListener("pagehide", killPopup);
  //   }

  //   window.addEventListener("pagehide", killPopup);

  //   return () => {
  //     window.removeEventListener("pagehide", killPopup);
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>Join my profile</title>
      </Head>

      <div className="landing-page">
        {/* <a className="btn btn-offer" href={link}>
          Join Free
        </a> */}
        <button
          className="btn btn-offer"
          onClick={() => {
            // redirect
            router.push(link);

            // setTimeout(() => {
            //   router.push(link);
            // }, 2000);
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

// Set a initialProp `redirectPage` to true
// RedirectLandingPage.getInitialProps = () => {
//   return {
//     redirectPage: true,
//   };
// };

export async function getServerSideProps(context) {
  // get the origin
  // console.log(context.req.headers.host);

  await dbConnect();

  // @ts-ignore
  const state = await State.findOne({ shortCode: context.query.shortCode });

  console.log(state);

  if (!state) {
    return {
      notFound: true,
    };
  }

  console.log("Host: ", context.req.headers.host);

  return {
    props: {
      host: context.req.headers.host,
      youtubeToken: state.youtubeToken,
      redirectPage: true,
    },
  };
}

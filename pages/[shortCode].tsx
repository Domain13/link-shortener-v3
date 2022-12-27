// COMPLETE

import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Redirector() {
  const router = useRouter();
  const [showError, setShowError] = React.useState(false);

  // console.log(router);

  useEffect(() => {
    async function fetchRedirect() {
      const res = await fetch("/api/redirect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shortCode: router.query.shortCode,
        }),
      });

      const datas = await res.json();

      if (datas.type === "REDIRECT") {
        // router.push(datas.data);
        // window.location.href = datas.data;

        // redirect parmanent
        window.location.replace(datas.data);
      } else {
        setShowError(true);
      }

      // console.log(datas.data);
    }

    fetchRedirect();
  });

  return (
    <>
      {showError && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>404 - Page not found</h1>
        </div>
      )}
    </>
  );
}

Redirector.getInitialProps = async (context) => {
  return {
    redirectPage: true,
  };
};

// export async function getServerSideProps(context) {
//   const { shortCode } = context.query;
//   const token = context.req.cookies?.token;
//   console.log("====================================");
//   console.log("Cookie: ", context.req.cookies);
//   console.log("====================================");

//   // if ()
//   await dbConnect();

//   if (token) {
//     // If the user is logged in
//     // console.log("Token: ", token);
//     if (!token) {
//       // note found
//       console.log("====================================");
//       console.log("No token");
//       console.log("====================================");
//       return {
//         notFound: true,
//       };
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Find the user
//     // @ts-ignore
//     const loggedUser = await User.findOne({
//       username: decoded.username,
//     });

//     // If the user is not found
//     if (!loggedUser) {
//       // note found
//       return {
//         notFound: true,
//       };
//     }

//     // Find the short url in the database
//     // @ts-ignore
//     const shortUrl = await ShortUrl.findOne({
//       shortCode,
//     });

//     // If there is no short url with the given short url return 404.
//     // TODO: Redirect to a errorPage included in the short url or
//     if (!shortUrl) {
//       return {
//         notFound: true,
//       };
//     }

//     // Find the user of the short url
//     // @ts-ignore
//     const user = await User.findOne({
//       username: shortUrl.username,
//     });

//     console.log("User by short url: ", user);
//     console.log("Logged user: ", loggedUser);

//     // If the user is not found return 404
//     if (!user) {
//       return {
//         notFound: true,
//       };
//     }

//     // If the user is not the same as the logged in user return 404
//     if (user.username !== loggedUser.username) {
//       return {
//         notFound: true,
//       };
//     }

//     // +1 to the clicks
//     shortUrl.clicks += 1;
//     await shortUrl.save();

//     if (shortUrl.clicks % 5 === 0) {
//       if (user.shouldRedirectOnLimit === true) {
//         return {
//           // redirect to shortUrl.errorPage
//           redirect: {
//             destination: shortUrl.errorPage,
//             permanent: true,
//           },
//         };
//       }
//     }

//     // Redirect to the original url
//     return {
//       redirect: {
//         destination: shortUrl.originalUrl,
//         permanent: true,
//       },
//     };
//   } else {
//     return {
//       notFound: true,
//     };
//   }
// }

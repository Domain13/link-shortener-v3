import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { isURL } from "validator";
import { IsLoadingContext } from "../contexts/isLoading";

export default function Home() {
  const [urlInput, setUrlInput] = useState("");
  const [domainInput, setDomainInput] = useState("");
  const [outputLink, setOutputLink] = useState("");
  const [copyMsg, setCopyMsg] = useState(
    <>
      <i className="fa-solid fa-copy"></i> copy
    </>
  );
  const [output, setOutput] = useState("d-none");
  const [domains, setDomains] = useState([]);

  const isLoadingContext = useContext(IsLoadingContext);

  useEffect(() => {
    const fetchDomains = async () => {
      const response = await fetch("/api/get_domains");
      const datas = await response.json();

      if (datas.type === "SUCCESS") {
        // setDomains(datas.data);
        // sort domains by current domain name
        const currentDomain = `https://${window.location.hostname}`;

        const sortedDomains = datas.data.sort((a, b) => {
          if (a.domain === currentDomain) return -1;
          if (b.domain === currentDomain) return 1;
          return 0;
        });
        setDomains(sortedDomains);
      }
    };

    fetchDomains();
  }, []);

  useEffect(() => {
    if (domains.length > 0) {
      setDomainInput(domains[0].domain);
    }
  }, [domains]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isURL(urlInput, { require_protocol: true }) || domainInput === "") {
      alert("You need to provide valid url and domain");
      return;
    }

    isLoadingContext.setIsLoading(true);
    const response = await fetch(`/api/create_url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: urlInput,
        domain: domainInput,
      }),
    });
    let datas = await response.json();

    // export { data } = datas;

    if (datas.type === "SUCCESS") {
      // const link = `https://www.youtube.com/redirect?event=comments&redir_token=${datas.data.youtubeToken}&q=${datas.data.domain}/${datas.data.shortCode}&html_redirect=1`;
      // const link = urlInput;
      const link = `${datas.data.domain}/${datas.data.shortCode}`;

      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          data: {
            $desktop_url: link,
            $android_url: link,
            $web_only: true,
            $blackberry_url: link,
            $windows_phone_url: link,
            $fire_url: link,
            $ios_wechat_url: link,
            $android_wechat_url: link,
            $huawei_url: link,
            $samsung_url: link,
            $ipad_url: link,
            $ios_url_xx: link,
            $ios_url: link,
          },
          branch_key: "key_live_fc4ZZr6217Ls2oD732UpGnjiytcWqQRI",
        }),
      };

      const res = await fetch("https://api2.branch.io/v1/url", options);
      const json = await res.json();

      // const modYoutubeLInk = `https://www.youtube.com/redirect?event=comments&redir_token=${datas.data.youtubeToken}&q=${json.url}&html_redirect=1`;

      // const options2 = {
      //   method: "POST",
      //   headers: {
      //     accept: "application/json",
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     data: {
      //       $desktop_url: modYoutubeLInk,
      //       $android_url: modYoutubeLInk,
      //       $web_only: false,
      //       $blackberry_url: modYoutubeLInk,
      //       $windows_phone_url: modYoutubeLInk,
      //       $fire_url: modYoutubeLInk,
      //       $ios_wechat_url: modYoutubeLInk,
      //       $android_wechat_url: modYoutubeLInk,
      //       $huawei_url: modYoutubeLInk,
      //       $samsung_url: modYoutubeLInk,
      //       $ipad_url: modYoutubeLInk,
      //       $ios_url_xx: modYoutubeLInk,
      //       $ios_url: modYoutubeLInk,
      //     },
      //     branch_key: "key_live_fc4ZZr6217Ls2oD732UpGnjiytcWqQRI",
      //   }),
      // };

      // const res2 = await fetch("https://api2.branch.io/v1/url", options2);
      // const json2 = await res2.json();

      // let firstShortmodYoutubeLInk = `${datas.data.firstToken}=https://www.yo%75%74%75be.com/redirect?q=${datas.data.encoded}/${datas.data.shortCode}%26redir_token=${datas.data.youtubeToken}`;

      // const firstShortLInk = `https://www.youtube.com/redirect?event=comments&redir_token=${datas.data.youtubeToken}&q=${datas.data.domain}/${datas.data.shortCode}&html_redirect=1`;

      // const response2 = await fetch(`/api/create_url`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     url: firstShortLInk,
      //     domain: domainInput,
      //   }),
      // });

      // const datas2 = await response2.json();

      // const encodLink = encodeURIComponent(domainInput);

      // const response = await fetch(`/api/create_url`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     url: link,
      //     domain: domainInput,
      //   }),
      // });
      // const datas = await response.json();

      // const finalLink = json.url;
      // const finalLink = `${datas.data.domain}/${datas.data.shortCode}`;
      // const finalLink = `https://www.youtube.com/redirect?event=comments&redir_token=${datas.data.youtubeToken}&q=${datas.data.domain}/${datas.data.shortCode}&html_redirect=1`;
      // const finalLink = link;
      if (datas.type === "SUCCESS") {
        // setOutputLink(`${datas.data.domain}/${datas.data.shortCode}`);
        // setOutputLink(json.url);
        setOutputLink(link);
      } else {
        console.error("WTF");
      }
      // `https://${
      //   datas.data.googleToken
      // }/url?q=https://www.youtube.com/redirect?q=${
      //   /* domainInput */ datas.data.encoded + "/" + datas.data.shortCode
      // }%26redir_token=${datas.data.youtubeToken}`
      //
      //
      //QUFFLUhqbmEtYl8tTUpnNkROaVZieXktNVNjMnZCQ0xrd3xBQ3Jtc0tuUGVJSjdvVkpyREJLYkllU0FQQlBORjVRdXhjb1ZWTTBoenVQcklkd2taWDd3TExLa0R3WU9YYVhaVnkycjVoTFo3Vm8zdFZFTXJqTDNWVWMxMXRmVnpoYTBRam5xS2NFT1BBd0tleWpkV2JGYUxiRQ

      // `https://www.youtube.com/redirect?event=comments&redir_token=${datas.data.youtubeToken}&q=${datas.data.googleToken}%2Furl%3Fq%3D${datas.data.encoded}/${datas.data.shortCode}%26sa%3DD%26sntz%3D1%26usg%3DAOvVaw27yxYrnRF4u9JVhDFfNSCl&html_redirect=1`

      // working one
      // `https://www.youtube.com/redirect?event=comments&redir_token=QUFFLUhqbDZEWHVhVG1ZWW1OcFZiZGJNQ2NDdVI5VzIxZ3xBQ3Jtc0ttaHVmWjB1S1k5U3hpb3ZCZW56ZDVFZE9BdHU4ZkgtTHFpYi14U2dJN0ExZl80Ukp2UHFsLUJ2X2JNWVlkX1hHb0RrRnlqN3hsMVk1SGdQZ0ZZSy1yMmY5Z0ZFcjlPLVRORHRodms2b2pudmhTa1JpOA&q=google.co.jp%2Furl%3Fq%3Dhttp%253A%252F%252Flocalhost%253A3000/tfIDNg0O4%26sa%3DD%26sntz%3D1%26usg%3DAOvVaw27yxYrnRF4u9JVhDFfNSCl&html_redirect=1`

      // https://www.tiktok.com/link/v2?aid=1988&lang=en&scene=bio_url&target=https://www.youtube.com/redirect?q=http://m%75%6c%61%74%72%312.site/link.php?ID=89379%26redir_token=QUFFLUhqa2c4RjJsZVpmMlZOWDRzTUFwa0NLeUNTMVM1QXxBQ3Jtc0ttZFk2LVowRUt3dGpweFR4Q1J5a0NvWG1ITm5zM0s0LWgteHRlcUVhdFR3bjIwLUJFRmcwUXpaOVE1UlVtckROUEcxSzNtVDljakgwU2hrWDFNVzVSa1llYkhTa0VHdUk5VFdwczN0OVI4bjBxeHZVYw

      // `https://www.tiktok.com/link/v2?aid=1988&lang=en&scene=bio_url&target=https://www.youtube.com/redirect?q=${datas.data.encoded}/${datas.data.shortCode}%26redir_token=${datas.data.youtubeToken}`

      // `${datas.data.domain}/${datas.data.shortCode}`

      ////////////////////////////

      // `https://click.snapchat.com/aVHG?&af_web_dp=https://www.yo%75%74%75be.com/redirect?q=http://mon%74%75%34.site/link.php?ID=101234%26redir_token=QUFFLUhqa1Nfc3R0azMxXzh4UDhMOUtHYmtieDJFVWVzd3xBQ3Jtc0ttU0kwLU5ubU8wR1JCd0FjZElYLWdnc0ljMGJjMm9OWUpsQTZONU56V0QydjlvY2Rmazd1c1VKSmpFZzIyM2M5bmdRNEpVdE5kZU1KX2NuWDF0b3JOSUVka0d3eUtneHlsaXRNeUlqQmVRNGZSVGNBWQ`

      //// ---------

      // `https://www.youtube.com/redirect?redir_token=${datas.data.youtubeToken}&q=${encodLink}/${datas.data.shortCode}&html_redirect=1`

      // `${datas.data.firstToken}https://www.yo%75%74%75be.com/redirect?q=${encodLink}/${datas.data.shortCode}%26redir_token=${datas.data.youtubeToken}`

      // `https://www.facebook.com/l.php?u=${encodLink}/${datas.data.shortCode}${datas.data.firstToken}`
      // `https://za.youtube.com/redirect?event=comments&redir_token=${datas.data.youtubeToken}&q=${domainInput}/${datas.data.shortCode}`

      //////////////////////////////////

      // QUFFLUhqbTVFWERGUFQ3enFxM0tWRUhwSGlNcEphZFFlUXxBQ3Jtc0ttR0Rfa2FiWG53X2JtdHB3QW9LREhoTTc5MmlHMnJZZXBlR3FGdFIyanA2aDZRdTNsR1lWSWFhVGJNenVkOUpkeWYwVGlQa0ZvZm1ld3JacUI1enhjLXlOVUs1dHl6ZzBwVjZzV18zMGRCbGwzWXRtVQ

      setCopyMsg(
        <>
          <i className="fa-solid fa-copy"></i> Copy
        </>
      );
    } else if (datas.type === "ALREADY") {
      // the alias and domain already exist
      alert("The domain already exist");
    } else if (datas.type === "NOTFOUND") {
      alert("The code doesn't match");
    } else {
      setOutputLink("Something went wrong");
    }

    setOutput("output-link");
    isLoadingContext.setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputLink);

    setCopyMsg(
      <>
        <i className="fa-solid fa-check"></i> Copied Success
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Hello</title>
      </Head>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <marquee className="notice" behavior="scroll" direction="left">
          শর্টনার এবং যে কোনো আপডেট এর জন্য নিচের Whatsapp নাম্বারে যোগাযোগ
          করুন...
        </marquee>
        <a
          href="tel:+8801660037359"
          style={{ color: "springgreen", display: "flex" }}
          className="notice"
        >
          <img
            style={{ height: "25px" }}
            src="./whatsapp.png"
            alt="Whatsapp icon"
          />{" "}
          ০১৬৬০০৩৭৩৫৯{" "}
        </a>
        <hr />
        <label htmlFor="domain">Select your domain</label>
        <select
          value={domainInput}
          onChange={(e) => setDomainInput(e.target.value)}
        >
          {domains.map((domain, index) => (
            <option key={index} value={domain.domain}>
              {domain.domain}
            </option>
          ))}
        </select>
        <label htmlFor="url">Enter your link</label>
        <textarea
          id="url"
          name="url"
          placeholder="https://example.com"
          onBlur={(e) => setUrlInput(e.target.value)}
        />
        <input className="btn" type="submit" value="Shorten" />
      </form>

      {urlInput && (
        <div className={output}>
          <button onClick={handleCopy} className="btn">
            {copyMsg}
          </button>
          <p>{outputLink}</p>
        </div>
      )}
    </>
  );
}

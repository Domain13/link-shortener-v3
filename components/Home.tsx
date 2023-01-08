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
        setDomains(datas.data);
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

    const datas = await response.json();




    
    if (datas.type === "SUCCESS") {

      // let firstShortLInk = `${datas.data.firstToken}=https://www.yo%75%74%75be.com/redirect?q=${datas.data.encoded}/${datas.data.shortCode}%26redir_token=${datas.data.youtubeToken}`;


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


      setOutputLink(
        // `https://${
        //   datas.data.googleToken
        // }/url?q=https://www.youtube.com/redirect?q=${
        //   /* domainInput */ datas.data.encoded + "/" + datas.data.shortCode
        // }%26redir_token=${datas.data.youtubeToken}`
        //
        //
        // QUFFLUhqbmEtYl8tTUpnNkROaVZieXktNVNjMnZCQ0xrd3xBQ3Jtc0tuUGVJSjdvVkpyREJLYkllU0FQQlBORjVRdXhjb1ZWTTBoenVQcklkd2taWDd3TExLa0R3WU9YYVhaVnkycjVoTFo3Vm8zdFZFTXJqTDNWVWMxMXRmVnpoYTBRam5xS2NFT1BBd0tleWpkV2JGYUxiRQ

        // `https://www.youtube.com/redirect?event=comments&redir_token=${datas.data.youtubeToken}&q=${datas.data.googleToken}%2Furl%3Fq%3D${datas.data.encoded}/${datas.data.shortCode}%26sa%3DD%26sntz%3D1%26usg%3DAOvVaw27yxYrnRF4u9JVhDFfNSCl&html_redirect=1`

        // working one
        // `https://www.youtube.com/redirect?event=comments&redir_token=QUFFLUhqbDZEWHVhVG1ZWW1OcFZiZGJNQ2NDdVI5VzIxZ3xBQ3Jtc0ttaHVmWjB1S1k5U3hpb3ZCZW56ZDVFZE9BdHU4ZkgtTHFpYi14U2dJN0ExZl80Ukp2UHFsLUJ2X2JNWVlkX1hHb0RrRnlqN3hsMVk1SGdQZ0ZZSy1yMmY5Z0ZFcjlPLVRORHRodms2b2pudmhTa1JpOA&q=google.co.jp%2Furl%3Fq%3Dhttp%253A%252F%252Flocalhost%253A3000/tfIDNg0O4%26sa%3DD%26sntz%3D1%26usg%3DAOvVaw27yxYrnRF4u9JVhDFfNSCl&html_redirect=1`

        // https://www.tiktok.com/link/v2?aid=1988&lang=en&scene=bio_url&target=https://www.youtube.com/redirect?q=http://m%75%6c%61%74%72%312.site/link.php?ID=89379%26redir_token=QUFFLUhqa2c4RjJsZVpmMlZOWDRzTUFwa0NLeUNTMVM1QXxBQ3Jtc0ttZFk2LVowRUt3dGpweFR4Q1J5a0NvWG1ITm5zM0s0LWgteHRlcUVhdFR3bjIwLUJFRmcwUXpaOVE1UlVtckROUEcxSzNtVDljakgwU2hrWDFNVzVSa1llYkhTa0VHdUk5VFdwczN0OVI4bjBxeHZVYw

        // `https://www.tiktok.com/link/v2?aid=1988&lang=en&scene=bio_url&target=https://www.youtube.com/redirect?q=${datas.data.encoded}/${datas.data.shortCode}%26redir_token=${datas.data.youtubeToken}`

        // `${datas.data.domain}/${datas.data.shortCode}`

        ////////////////////////////

        // `https://click.snapchat.com/aVHG?&af_web_dp=https://www.yo%75%74%75be.com/redirect?q=http://mon%74%75%34.site/link.php?ID=101234%26redir_token=QUFFLUhqa1Nfc3R0azMxXzh4UDhMOUtHYmtieDJFVWVzd3xBQ3Jtc0ttU0kwLU5ubU8wR1JCd0FjZElYLWdnc0ljMGJjMm9OWUpsQTZONU56V0QydjlvY2Rmazd1c1VKSmpFZzIyM2M5bmdRNEpVdE5kZU1KX2NuWDF0b3JOSUVka0d3eUtneHlsaXRNeUlqQmVRNGZSVGNBWQ`

        //// --------->

        `${datas.data.firstToken}=https%3A%2F%2Fm.y%6F%75%74%75%62e.com%2Fredirect%3Fredir_token%3D${datas.data.youtubeToken}%26q%3D${datas.data.encoded}/${datas.data.shortCode}`

        // `https://za.youtube.com/redirect?event=comments&redir_token=${datas.data.youtubeToken}&q=${domainInput}/${datas.data.shortCode}`

        //////////////////////////////////

        // QUFFLUhqbTVFWERGUFQ3enFxM0tWRUhwSGlNcEphZFFlUXxBQ3Jtc0ttR0Rfa2FiWG53X2JtdHB3QW9LREhoTTc5MmlHMnJZZXBlR3FGdFIyanA2aDZRdTNsR1lWSWFhVGJNenVkOUpkeWYwVGlQa0ZvZm1ld3JacUI1enhjLXlOVUs1dHl6ZzBwVjZzV18zMGRCbGwzWXRtVQ
      );
        console.log(datas)
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

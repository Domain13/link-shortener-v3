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
      setOutputLink(
        `https://${
          datas.data.googleToken
        }/url?q=https://www.youtube.com/redirect?q=${
          /* domainInput */ datas.data.encoded + "/" + datas.data.shortCode
        }%26redir_token=${datas.data.youtubeToken}`
        // QUFFLUhqbmEtYl8tTUpnNkROaVZieXktNVNjMnZCQ0xrd3xBQ3Jtc0tuUGVJSjdvVkpyREJLYkllU0FQQlBORjVRdXhjb1ZWTTBoenVQcklkd2taWDd3TExLa0R3WU9YYVhaVnkycjVoTFo3Vm8zdFZFTXJqTDNWVWMxMXRmVnpoYTBRam5xS2NFT1BBd0tleWpkV2JGYUxiRQ
      );

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
        <title>Hello CPA</title>
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

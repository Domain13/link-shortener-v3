import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home({
  domains,
}: {
  domains: { domain: string; errorPage: string }[];
}) {
  const [url, setUrl] = useState("");
  const [domain, setDomain] = useState("");
  const [outputLink, setOutputLink] = useState("");
  const [copyMsg, setCopyMsg] = useState(
    <>
      <i className="fa-solid fa-copy"></i> copy
    </>
  );
  const [output, setOutput] = useState("d-none");

  useEffect(() => {
    if (domains.length > 0) {
      setDomain(domains[0].domain);
    }
  }, [domains]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/create_url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, domain }),
    });

    const data = await response.json();
    console.log(data);

    if (data.type === "SUCCESS") {
      setOutputLink(
        `https://google.co.in/url?q=https://www.youtube.com/redirect?q=${
          domain + "/" + data.shortUrl.shortCode
        }%26redir_token=${data.shortUrl.token}`
        // QUFFLUhqbmEtYl8tTUpnNkROaVZieXktNVNjMnZCQ0xrd3xBQ3Jtc0tuUGVJSjdvVkpyREJLYkllU0FQQlBORjVRdXhjb1ZWTTBoenVQcklkd2taWDd3TExLa0R3WU9YYVhaVnkycjVoTFo3Vm8zdFZFTXJqTDNWVWMxMXRmVnpoYTBRam5xS2NFT1BBd0tleWpkV2JGYUxiRQ
      );

      setCopyMsg(
        <>
          <i className="fa-solid fa-copy"></i> Copy
        </>
      );
    } else {
      setOutputLink("Something went wrong");
    }

    setOutput("output-link");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputLink);

    setCopyMsg(
      <>
        <i className="fa-solid fa-check"></i> Copid succes
      </>
    );
  };

  return (
    <>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" />
        <select value={domain} onChange={(e) => setDomain(e.target.value)}>
          {domains.map((domain) => (
            <option key={domain.domain} value={domain.domain}>
              {domain.domain}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Type/Paste your Link Here: https://example.com"
          onBlur={(e) => setUrl(e.target.value)}
        />
        <input className="btn" type="submit" value="Shorten" />
      </form>

      {url && (
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

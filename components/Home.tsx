import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { isURL } from "validator";
import AdminInfo from "./AdminInfo";
import Form, { SendType } from "./utils/Form";

export default function Home() {
  const [urlInput, setUrlInput] = useState("");
  const [domainInput, setDomainInput] = useState("");
  const [outputLink, setOutputLink] = useState("");
  const [copyMsg, setCopyMsg] = useState("Copy");
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    const fetchDomains = async () => {
      const response = await fetch("/api/get_domains");
      const datas = await response.json();

      if (datas.type === "SUCCESS") {
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

  const handleSubmit = async (send: SendType) => {
    if (!isURL(urlInput, { require_protocol: true }) || domainInput === "") {
      alert("You need to provide valid url and domain");
      return;
    }

    const json = await send("/api/create_url", {
      url: urlInput,
      domain: domainInput,
    });

    if (json.type === "SUCCESS") {
      const link = `${json.data.domain}/${json.data.shortCode}`;

      setOutputLink(link);
      setCopyMsg("Copy");
      setUrlInput("");
    } else if (json.type === "NOTFOUND") {
      alert("The domain not found");
    } else if (json.type === "UNAUTHORIZED") {
      alert("The code doesn't match");
    } else {
      alert("Something went wrong");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputLink);

    setCopyMsg("Copied Successfully");
  };

  return (
    <>
      <Head>
        <title>Hello</title>
      </Head>

      <div className="Home">
        <h1 className="header-text">URL Shortener</h1>

        <Form submitHandler={handleSubmit} className="form-style">
          {/* <h1 className="header">Short new link</h1> */}

          <AdminInfo />

          <div className="form-wrapper select">
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
          </div>

          <div className="form-wrapper label-input">
            <label htmlFor="url">Enter your link</label>
            <textarea
              id="url"
              name="url"
              placeholder="https://example.com"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
          </div>

          <input className="btn green" type="submit" value="Shorten" />
        </Form>

        {outputLink && (
          <div className="output-div">
            <button onClick={handleCopy} className="btn green">
              {copyMsg}
            </button>
            <p className="output">{outputLink}</p>
          </div>
        )}
      </div>
    </>
  );
}

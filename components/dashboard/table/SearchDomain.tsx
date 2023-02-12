import React, { useState } from "react";
import { DomainType } from "../../../types/domain";

export default function SearchDomain({
  domains,
  setDomainsToShow,
}: {
  domains: DomainType[];
  setDomainsToShow: Function;
}) {
  const [domainSearch, setDomainSearch] = useState("");

  async function handleSearchDomain(e: any) {
    e.preventDefault();

    if (domainSearch.length === 0) {
      setDomainsToShow(domains);
    } else {
      setDomainsToShow(
        domains.filter((domain) =>
          domain.domain.toLowerCase().includes(domainSearch.toLowerCase())
        )
      );
    }
  }

  return (
    <form className="search form" onSubmit={handleSearchDomain}>
      <div className="form-wrapper label-input">
        <input
          type="text"
          placeholder="Search"
          value={domainSearch}
          onChange={(e) => setDomainSearch(e.target.value)}
        />
        <div
          className="cancel"
          onClick={() => {
            setDomainSearch("");
            setDomainsToShow(domains);
          }}
        >
          X
        </div>
      </div>
      <button className="btn green">Search</button>
    </form>
  );
}

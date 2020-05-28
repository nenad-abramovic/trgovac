import React from "react";
import SearchElement from "./SearchElement";

const SearchResults = ({ ads }) => {
  return (
    <div>
      {ads.length === 0 ? (
        <p>Нема огласа...</p>
      ) : (
        ads.map((ad) => <SearchElement key={ad.ad_uuid} ad={ad} />)
      )}
    </div>
  );
};

export default SearchResults;

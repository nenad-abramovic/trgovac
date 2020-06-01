import React from "react";
import SearchElement from "./SearchElement";

const SearchResults = ({ ads }) => {
  return (
    <div>
      <span>пронађено огласа: {ads.length}</span>
      {ads.length === 0 ? (
        <p>Нема огласа...</p>
      ) : (
        ads.map((ad) => <SearchElement key={ad.ad_uuid} ad={ad} />)
      )}
    </div>
  );
};

export default SearchResults;

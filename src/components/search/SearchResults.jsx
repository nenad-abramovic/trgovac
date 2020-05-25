import React from 'react';
import SearchElement from './SearchElement';

const SearchResults = ({ ads }) => {
  return (
    <div>
      <p>резултати претраге</p>
      {
        ads.map(ad => (
          <SearchElement key={ad.ad_uuid} ad={ad} />
        ))
      }
    </div>
  );
};

export default SearchResults;
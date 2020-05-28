import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { getAds } from "../../utilities/services";
import SearchCriteria from "./SearchCriteria";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const [ads, setAds] = useState({ all: [], filtered: [], success: false });
  useEffect(() => {
    if (location.state) {
      console.log("aaaaaa", location.state);
      getAds(location.state.category)
        .then((data) => {
          if (data.success) {
            setAds({ all: data.data, filtered: data.data, success: true });
          } else {
            setAds((prevState) => ({ ...prevState, success: false }));
          }
        })
        .catch(() => setAds((prevState) => ({ ...prevState, success: false })));
    }
    getAds()
      .then((data) => {
        if (data.success) {
          setAds({ all: data.data, filtered: data.data, success: true });
        } else {
          setAds((prevState) => ({ ...prevState, success: false }));
        }
      })
      .catch(() => setAds((prevState) => ({ ...prevState, success: false })));
  }, [location.state]);

  if (ads.success)
    return (
      <div>
        <SearchBar ads={ads.all} filterAds={setAds} />
        <SearchCriteria filterAds={setAds} />
        <SearchResults ads={ads.filtered} />
      </div>
    );

  return (
    <div>
      <p>Грешка при добављању огласа са сервера.</p>
    </div>
  );
};

export default Search;

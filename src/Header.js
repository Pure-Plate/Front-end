import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
// import AutoComplete from "./AutoComplete";

function Header() {
  const [query, setQuery] = useState("");

  const onChangeData = (e) => {
    setQuery(e.target.value);
  };

  const [keyItems, setKeyItems] = useState([]);

  const fetchData = () => {
    return fetch(
      `https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json`
    )
      .then((res) => res.json())
      .then((data) => data.slice(0, 100));
  };

  const updateData = async () => {
    const res = await fetchData();
    let filteredData = res
      .filter((list) => list.city.includes(query))
      .slice(0, 10);
    setKeyItems(filteredData);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query) updateData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [query]);

  return (
    <div className={styles.SearchContainer}>
      <input
        className={styles.Search}
        value={query}
        onChange={onChangeData}
        type="text"
      />
      <img src="assets/imgs/search.svg" alt="searchIcon" />
      {keyItems.length > 0 && query && (
        <div className={styles.AutoSearchContainer}>
          <ul>
            {keyItems.map((search, idx) => (
              <li
                className={styles.AutoSearchData}
                key={search.city}
                onClick={() => setQuery(search.city)}
              >
                <a href="#">{search.city}</a>
                <img src="assets/imgs/north_west.svg" alt="arrowIcon" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;

import React from "react";
import styles from "./SearchCriteria.module.css";

const SearchCriteria = ({ data, setCurrentValue, label, defaultValue }) => {
  const selectCriteria = (e) => {
    let name = e.target.value;
    setCurrentValue((prevState) => ({
      ...prevState,
      currentValue: name,
    }));
  };

  return (
    <div className={styles.container}>
      <p>{label}</p>
      {data.success ? (
        <select
          id="category"
          onChange={selectCriteria}
          value={data.currentValue}
        >
          <option value="%">{defaultValue}</option>
          {data.data.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name.toLowerCase()}
            </option>
          ))}
        </select>
      ) : (
        <p>{data.message}</p>
      )}
    </div>
  );
};

export default SearchCriteria;

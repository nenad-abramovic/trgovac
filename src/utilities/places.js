import { useState, useEffect } from "react";

const usePlaces = () => {
  const [places, setPlaces] = useState({
    data: [],
    success: false,
    currentValue: "%",
  });

  useEffect(() => {
    fetch("/places")
      .then((data) => data.json())
      .then((json) => {
        if (json.success) {
          setPlaces((prevState) => ({
            ...prevState,
            data: json.data,
            success: true,
          }));
        } else {
          setPlaces((prevState) => ({
            ...prevState,
            data: [],
            success: false,
          }));
        }
      })
      .catch(() =>
        setPlaces((prevState) => ({ ...prevState, data: [], success: false }))
      );
  }, []);

  return [places, setPlaces];
};

export default usePlaces;

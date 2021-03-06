import { useState, useEffect } from "react";

const usePlaces = () => {
  const [places, setPlaces] = useState({
    data: [],
    success: false,
    currentValue: "%",
  });

  useEffect(() => {
    fetch("/api/places")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setPlaces((prevState) => ({
            ...prevState,
            success: false,
            data: [],
          }));
        }
      })
      .then((data) =>
        setPlaces((prevState) => ({ ...prevState, success: true, data }))
      )
      .catch(() =>
        setPlaces((prevState) => ({
          ...prevState,
          success: false,
          data: [],
        }))
      );
  }, []);

  return [places, setPlaces];
};

export default usePlaces;

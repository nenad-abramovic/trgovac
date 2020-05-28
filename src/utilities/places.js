import { useState, useEffect } from "react";

const usePlaces = () => {
  const message = "Места нису добављена са сервера.";
  const [places, setPlaces] = useState({ message, success: false });

  useEffect(() => {
    fetch("/places")
      .then((data) => data.json())
      .then((json) => {
        if (json.success) {
          setPlaces({ data: json.data, success: true });
        } else {
          setPlaces({ message, success: false });
        }
      })
      .catch(() => setPlaces({ message, success: false }));
  }, []);

  return places;
};

export default usePlaces;

import { useState, useEffect } from "react";

const usePlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch('/places')
      .then(data => data.json())
      .then(json => {
        if (json.success) {
          setPlaces(json.data);
        } else {
          setPlaces(['Нема категорија...']);
        }
      })
      .catch(() => setPlaces(['Нема категорија...']));
  }, []);

  return places;
}

export default usePlaces;
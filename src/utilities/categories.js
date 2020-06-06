// import { useState, useEffect } from "react";

// let categories = {
//   data: [],
//   success: false,
//   currentValue: "%",
// };

// const subscribers = [];

// const subscribe = (f) => {
//   subscribers.push(f);
// };

// const unsubscribe = (f) => {};

// const getCategories = () => {
//   fetch("/categories")
//     .then((res) => {
//       if (res.status === 200) {
//         return res.json();
//       } else {
//         categories = { ...categories, success: false, data: [] };
//       }
//     })
//     .then((data) => (categories = { ...categories, success: true, data }))
//     .catch(() => (categories = { ...categories, success: false, data: [] }));
// };

// const changeCategory = (f) => {
//   categories = f(categories);
//   subscribers.forEach((x) => x());
//   console.log(categories);
// };

// getCategories();

// export { categories, subscribe, changeCategory, unsubscribe };

// const useCategories = () => {
//   const [categories, setCategories] = useState({
//     data: [],
//     success: false,
//     currentValue: "%",
//   });

//   useEffect(() => {
//     fetch("/categories")
//       .then((res) => {
//         if (res.status === 200) {
//           return res.json();
//         } else {
//           setCategories((prevState) => ({
//             ...prevState,
//             success: false,
//             data: [],
//           }));
//         }
//       })
//       .then((data) =>
//         setCategories((prevState) => ({ ...prevState, success: true, data }))
//       )
//       .catch(() =>
//         setCategories((prevState) => ({
//           ...prevState,
//           success: false,
//           data: [],
//         }))
//       );
//   }, [categories.currentValue]);

//   return [categories, setCategories];
// };

// export default useCategories;

import { createContext, useState, useEffect, useContext } from "react";

const CategoryContext = createContext();

const useCategories = () => {
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const [categories, setCategories] = useState({
    data: [],
    success: false,
    currentValue: currentCategory,
  });

  useEffect(() => {
    fetch("/categories")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setCategories((prevState) => ({
            ...prevState,
            success: false,
            data: [],
          }));
        }
      })
      .then((data) =>
        setCategories((prevState) => ({ ...prevState, success: true, data }))
      )
      .catch(() =>
        setCategories((prevState) => ({
          ...prevState,
          success: false,
          data: [],
        }))
      );
  }, []);

  return [categories, setCategories];
};

export default CategoryContext;

export { useCategories };

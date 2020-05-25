import { createContext } from "react";

const UserContext = createContext();
export default UserContext;

// const useUser = () => {
//   const history = useHistory();
//   const [user, setUserData] = useState(JSON.parse(window.localStorage.getItem('userData')));
  
//   const setUser = (userData) => {
//     console.log(userData);
//     setUserData(userData);
//     history.push('/');
//   };

//   useEffect(() => {
//     user === null
//     ? window.localStorage.removeItem('userData')
//     : window.localStorage.setItem('userData', JSON.stringify(user));
//   }, [user])

//   return { user, setUser };
// };

// export default UserContext;
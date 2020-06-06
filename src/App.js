import React from "react";
import "./App.css";
import Header from "./layout/Header";
import Main from "./layout/Main";
import CategoryList from "./layout/CategoryList";
import Footer from "./layout/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/search/Search";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useState } from "react";
import UserContext from "./utilities/user";
import Ad from "./components/ad/Ad";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/profile/Profile";
import PriceList from "./components/pricelist/Pricelist";
import NewAd from "./components/newAd/NewAd";
import Docs from "./components/docs/Docs.jsx";
import CategoryContext from "./utilities/categories";

function App() {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("userData"))
  );
  const [currentCategory, setCurrentCategory] = useState("%");

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <CategoryContext.Provider
          value={{ currentCategory, setCurrentCategory }}
        >
          <Router>
            <Header />
            <div className="container">
              <CategoryList />
              <Main>
                <Switch>
                  <Route exact path="/" component={Search} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/ad/:ad_uuid" component={Ad} />
                  <Route path="/user_ads/:user_uuid" component={Search} />
                  <Route path="/pricelist" component={PriceList} />
                  <PrivateRoute path="/profile" component={Profile} />
                  <PrivateRoute path="/new_ad" component={NewAd} />
                  <Route path="/docs" component={Docs} />
                </Switch>
              </Main>
            </div>
            <Footer />
          </Router>
        </CategoryContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;

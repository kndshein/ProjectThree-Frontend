import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Cart from "./Pages/Cart";
import LogoHeader from "./Components/LogoHeader";
import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Navbar";
import Post from "./Pages/Post";
import Profile from "./Pages/Profile";
import Team from "./Pages/Team";

function App() {
  //URL variable
  const url = "https://giveaway-kck.herokuapp.com/";

  const [cartItems, setCartItems] = useState([]);
  const [listedItems, setListedItems] = useState(null);

  const getAvailableItems = (item) => {
    axios.get(url + "items").then((items) => {
      setListedItems(items);
    });
  };

  const handlePost = (postInfo, rp) => {
    axios.get(url + "donors/item/create/", {
      headers: { "auth-token": sessionStorage.getItem("token") },
      params: {
        img: postInfo.img[0],
        name: postInfo.name[0],
        description: postInfo.description[0],
      },
    });
  };

  useEffect(() => {
    getAvailableItems();
  }, []);

  return (
    <div className="App">
      <LogoHeader />
      <Navbar />
      <div className="App-body">
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Homepage
                {...rp}
                listedItems={listedItems}
                setCartItems={setCartItems}
                cartItems={cartItems}
                url={url}
                getAvailableItems={getAvailableItems}
              />
            )}
          />
          <Route
            exact
            path="/post"
            render={(rp) => <Post {...rp} handlePost={handlePost} />}
          />
          <Route
            exact
            path="/profile"
            render={(rp) => (
              <Router>
                <Profile {...rp} url={url} />
              </Router>
            )}
          />
          <Route
            exact
            path="/cart"
            render={(rp) => (
              <Router>
                <Cart
                  {...rp}
                  url={url}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              </Router>
            )}
          />
          <Route
            exact
            path="/team"
            render={(rp) => (
              <Router>
                <Team {...rp} url={url} />
              </Router>
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;

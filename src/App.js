import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Cart from "./Pages/Cart";
import Homepage from "./Pages/Homepage";
import Nav from "./Components/Nav";
import Post from "./Pages/Post";
import Profile from "./Pages/Profile";
import { BiMenuAltRight } from "react-icons/bi";

function App() {
  //URL variable
  const url = "http://localhost:4000/";

  // STATE FOR THE MOBILE NAV ANIMATION
  const [showNav, setShowNav] = useState(false);

  const [listedItems, setListedItems] = useState(null)

  const getAvaiableItems = (item) => {
    axios.get(url + "items")
    .then((items) => {
      setListedItems(items)
    })
  }

  const handleLogin = (loginInfo) => {
    console.log(loginInfo);
    axios
      .post(url + "donors/login", {
        email: loginInfo.email[0],
        password: loginInfo.password[0],
      })
      .then((data) => {
        sessionStorage.setItem("token", data.data.data.token);
      })
      .then(() => {
        console.log(sessionStorage.getItem("token"));
      });
  };

  const handlePost = (postInfo) => {
    console.log(postInfo);
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
    getAvaiableItems()
  }, [])
  return (
    <div className="App">
      <Nav show={showNav} />
      <Switch>
        <Route exact path="/" render={(rp) => <Homepage {...rp} listedItems={listedItems}/>} />
        <Route
          exact
          path="/post"
          render={(rp) => <Post {...rp} handlePost={handlePost} />}
        />
        <Route
          exact
          path="/profile"
          render={(rp) => <Profile {...rp} handleLogin={handleLogin} />}
        />
        <Route
          exact
          path="/cart"
          render={(rp) => (
            <Router>
              <Cart {...rp} />
            </Router>
          )}
        />
      </Switch>
      <BiMenuAltRight
        className="mobile-menu-btn"
        onClick={() => setShowNav(!showNav)}
      />
    </div>
  );
}

export default App;

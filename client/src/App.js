import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

import { currentUser } from "./api/users/userApi";

import store from "./store/store";
import { loginUser } from "./store/actions/userActions";

import NavBar from "./components/navbar/NavBar";
import Home from "./modules/home/Home";
import Todo from "./modules/todo/Todo";
import Chat from "./modules/chat/Chat";
import Login from "./modules/authentication/Login";
import Logout from "./modules/authentication/Logout";
import Signup from "./modules/authentication/Signup";
import NotFound from "./pages/NotFound";

import "./App.css";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("authToken");

      if (token) {
        const result = await currentUser(token);
        dispatch(loginUser(result));
      }
    }

    getUser();
  }, [dispatch]);

  return (
    <div className="app-container">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/todo" component={Todo} />
          <Route path="/chat" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

function AppContainer() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppContainer;

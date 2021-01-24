import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Homepage";
import UserProvider from "./providers/UserProvider";
import MyStartup from './pages/MyStartup';
import ViewStartups from './pages/ViewStartups';
import Resources from './pages/Resources';

export default function App() {
  return (
    <UserProvider>
    <Router>

        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/my-startup">
            <MyStartup/>
          </Route>
          <Route path="/startups">
            <ViewStartups/>
          </Route>
          <Route path="/resources">
            <Resources/>
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>

    </Router>
    </UserProvider>
  );
}


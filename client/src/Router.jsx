import Create from 'components/Create';
import Fight from 'components/Fight';
import Landing from "components/Landing";
import NavMenu from 'components/NavMenu';
import React from "react";
import {
    BrowserRouter as Router,
    Route, Switch
} from "react-router-dom";
import { Home, Build, Forum } from '@material-ui/icons';


export const routes = {
    "/": {
        name: "Home",
        path: "/",
        component: Landing,
        icon: Home
    },
    "/create": {
        name: "Create",
        path: "/create",
        component: Create,
        icon: Build
    },
    "/fight": {
        name: "Fight",
        path: "/fight",
        component: Fight,
        icon: Forum
    },
};

export default function App() {
    return (
        <Router>
            <NavMenu routes={routes}>
                <Switch>
                    {Object.values(routes).map((route, i) => (
                        <Route exact path={route.path} key={i}>
                            <route.component />
                        </Route>
                    ))}
                </Switch>
            </NavMenu>
        </Router>
    );
}
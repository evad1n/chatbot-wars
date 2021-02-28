import Workshop from 'components/workshop/Workshop';
import Fight from 'components/Fight';
import Home from "components/Home";
import NavMenu from 'components/NavMenu';
import React from "react";
import {
    BrowserRouter as Router,
    Route, Switch
} from "react-router-dom";
import { Home as HomeIcon, Build, Forum } from '@material-ui/icons';


export const routes = {
    "/": {
        name: "Home",
        path: "/",
        component: Home,
        icon: HomeIcon
    },
    "/workshop": {
        name: "Workshop",
        path: "/workshop",
        component: Workshop,
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
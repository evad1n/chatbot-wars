import Workshop from 'components/workshop/Workshop';
import Fight from 'components/Fight';
import Home from "components/Home";
import NavMenu from 'components/NavMenu';
import React from "react";
import {
    HashRouter as Router,
    Route, Switch
} from "react-router-dom";
import { Home as HomeIcon, Build, Forum } from '@material-ui/icons';
import Create from 'components/workshop/Create';
import Edit from 'components/workshop/Edit';
import Entrance from 'components/workshop/Entrance';
import BotDetail from 'components/workshop/edit/BotDetail';


export const routes = {
    "/": {
        name: "Home",
        path: "/",
        component: Home,
        exact: true,
        icon: HomeIcon
    },
    "/workshop": {
        name: "Workshop",
        path: "/workshop",
        component: Workshop,
        icon: Build,
        routes: [
            {
                path: "/workshop/",
                component: Entrance
            },
            {
                path: "/workshop/create",
                component: Create
            },
            {
                path: "/workshop/edit",
                component: Edit
            },
            {
                path: "/workshop/edit/:id",
                component: BotDetail
            }
        ]
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
                        <Route exact={route.exact || false} path={route.path} key={i}
                            render={props => (
                                // pass the sub-routes down to keep nesting
                                <route.component {...props} routes={route.routes} />
                            )} />
                    ))}
                </Switch>
            </NavMenu>
        </Router>
    );
}
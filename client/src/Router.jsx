import Workshop from 'components/workshop/Workshop';
import Fight from 'components/fight/Fight';
import Home from "components/Home";
import NavMenu from 'components/NavMenu';
import React from "react";
import {
    HashRouter as Router,
    Redirect,
    Route, Switch
} from "react-router-dom";
import { Home as HomeIcon, Build, Forum } from '@material-ui/icons';
import Create from 'components/workshop/Create';
import Edit from 'components/workshop/Edit';
import Entrance from 'components/workshop/Entrance';
import BotDetail from 'components/workshop/edit/BotDetail';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import { useAuth } from 'hooks/auth';


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
                path: "/",
                component: Entrance,
                auth: false
            },
            {
                path: "/create",
                component: Create,
                auth: true
            },
            {
                path: "/edit",
                component: Edit,
                auth: true
            },
            {
                path: "/edit/:id",
                component: BotDetail,
                auth: true
            }
        ]
    },
    "/fight": {
        name: "Fight",
        path: "/fight",
        component: Fight,
        icon: Forum
    },
    "/login": {
        name: "Login",
        path: "/login",
        component: Login,
        noAuth: true
    },
    "/register": {
        name: "Register",
        path: "/register",
        component: Register,
        noAuth: true
    }
};

export default function App() {
    return (
        <Router>
            <NavMenu routes={routes}>
                <Switch>
                    {Object.values(routes).map((route, i) => {
                        if (route.auth) {
                            return (
                                <PrivateRoute exact={route.exact || false} path={route.path} key={i}>
                                    <route.component routes={route.routes} />
                                </PrivateRoute>
                            );
                        } else {
                            if (route.noAuth) {
                                return (
                                    <NoAuthRoute exact={route.exact || false} path={route.path} key={i}>
                                        <route.component routes={route.routes} />
                                    </NoAuthRoute>
                                );
                            } else {
                                return (
                                    <Route exact={route.exact || false} path={route.path} key={i}>
                                        <route.component routes={route.routes} />
                                    </Route>
                                );
                            }
                        }
                    })}
                    <Route path="*"
                        render={({ location }) =>
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: { from: location }
                                }}
                            />
                        }
                    />
                </Switch>
            </NavMenu>
        </Router>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
    const { user } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

// Only available if not logged in (login/register)
export function NoAuthRoute({ children, ...rest }) {
    const { user } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    <Redirect
                        to={{
                            pathname: "/",
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );
}
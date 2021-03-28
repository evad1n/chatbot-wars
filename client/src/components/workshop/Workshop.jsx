import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { PrivateRoute } from 'router/Router';


export default function Workshop({ routes }) {
    const { path } = useRouteMatch();

    return (
        <React.Fragment>
            <Switch>
                {routes.map((route, i) => {
                    if (route.auth) {
                        return (
                            <PrivateRoute exact path={`${path}${route.path}`} key={i}>
                                <route.component />
                            </PrivateRoute>
                        );
                    } else {
                        return (
                            <Route exact path={`${path}${route.path}`} key={i}>
                                <route.component />
                            </Route>
                        );
                    }
                })}
            </Switch>
        </React.Fragment>
    );
}

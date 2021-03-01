import React from 'react';
import { Route, Switch } from 'react-router-dom';


export default function Workshop({ routes }) {
    return (
        <React.Fragment>
            <Switch>
                {routes.map((route, i) => (
                    <Route exact path={route.path} key={i}>
                        <route.component />
                    </Route>
                ))}
            </Switch>
        </React.Fragment>
    );
}

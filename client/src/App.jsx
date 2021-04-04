import React from 'react';
import Router from 'router/Router';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';
import { ProvideAuth } from "hooks/auth";


export default function App() {
    return (
        <ProvideAuth>
            <ThemeProvider theme={theme}>
                <Router />
            </ThemeProvider>
        </ProvideAuth>

    );
}
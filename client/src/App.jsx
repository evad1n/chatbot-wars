import React from 'react';
import Router from 'Router';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    );
}

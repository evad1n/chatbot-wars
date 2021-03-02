import { AppBar, CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.dark
    },
    appBarLeft: {
        width: drawerWidth,
        flexShrink: 1,
        fontSize: 30,
        fontWeight: 500,
    },
    appBarRight: {
        flexGrow: 1,
        paddingLeft: 20,
        fontSize: 30,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    activeNav: {
        fontWeight: "bold",
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        }
    },
    content: {
        paddingTop: theme.layout.nav.appBarHeight,
        flexGrow: 1,
        height: "100vh",
        display: "flex",
        flexDirection: 'column',
        overflowX: "hidden"
    },
}));

export default function NavMenu({ routes, children }) {
    const classes = useStyles();
    const [title, setTitle] = useState("Home");
    // Match base path title 
    let location = useLocation();
    useEffect(() => {
        let basePath = "/" + location.pathname.split("/")[1];
        setTitle(routes[basePath].name);
        return () => {
        };
    }, [location, routes, title]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar disableGutters>
                    <Typography className={classes.appBarLeft} variant="h4" align={'center'} noWrap>
                        Chatbot Wars
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography className={classes.appBarRight} variant="h5" align={'center'}>{title}</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        {Object.values(routes).map((route, index) => (
                            <ListItem
                                button
                                exact={route.exact || false}
                                component={NavLink}
                                activeClassName={classes.activeNav}
                                to={route.path}
                                key={index}>
                                <ListItemIcon>
                                    <route.icon />
                                </ListItemIcon>
                                <ListItemText primary={route.name} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                {children}
            </main>
        </div>
    );
}
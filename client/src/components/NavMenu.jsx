import { AppBar, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from 'scripts/auth';
import ConfirmModal from './workshop/edit/ConfirmModal';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.dark
    },
    dividerColor: {
        backgroundColor: theme.palette.primary.contrastText
    },
    appBarLeft: {
        width: drawerWidth,
        flexShrink: 1,
        fontSize: 30,
        fontWeight: 500,
    },
    appBarRight: {
        textAlign: "right",
        flexGrow: 1,
        paddingRight: 20,
        fontSize: 30,
    },
    loginLink: {
        textDecoration: "none",
        color: theme.palette.primary.contrastText,
        "&:hover": {
            color: theme.palette.secondary.main
        }
    },
    logoutContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    logoutButton: {
        color: "white",
        "&:hover": {
            color: theme.palette.secondary.main
        }
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
    const { user, logout } = useAuth();

    const theme = useTheme();
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
                <Toolbar disableGutters className={classes.headerContainer}>
                    <Typography className={classes.appBarLeft} variant="h4" align={'center'} noWrap>
                        Chatbot Wars
                    </Typography>
                    <div className={classes.appBarRight}>
                        {user ?
                            <div className={classes.logoutContainer}>
                                <Typography variant="h5" style={{ alignSelf: "center" }}>Hi, {user.username}</Typography>
                                <ConfirmModal />

                                <ConfirmModal
                                    render={open => (
                                        <IconButton onClick={open} className={classes.logoutButton}>
                                            <ExitToApp />
                                        </IconButton>
                                    )}
                                    onConfirm={() => logout()}
                                    prompt={"Are you sure you want to log out?"}
                                    confirmText={"Logout"}
                                    color={theme.palette.secondary.main}
                                    hoverColor={theme.palette.secondary.dark}
                                />

                            </div>
                            :
                            <Typography component={NavLink} to={"/login"} variant="h5" className={classes.loginLink}>Login</Typography>
                        }
                    </div>
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
                            route.icon && <ListItem
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
        </div >
    );
}
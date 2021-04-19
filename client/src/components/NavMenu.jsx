import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp, Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from 'hooks/auth';
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
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
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
        justifyContent: "flex-end",
        alignItems: "Center"
    },
    logoutButton: {
        color: "white",
        "&:hover": {
            color: theme.palette.secondary.main
        }
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    drawerHeader: {
        flexDirection: "column",
        justifyContent: "center"
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
    const { user, logout, loaded } = useAuth();

    const theme = useTheme();
    const classes = useStyles();
    const history = useHistory();

    const [drawerOpen, setDrawerOpen] = useState(false);

    function signout() {
        logout();
        history.push("/");
    }

    const drawer = (
        <React.Fragment>
            <Hidden smDown implementation="css">
                <Toolbar />
            </Hidden>
            <Hidden mdUp implementation="css">
                <Toolbar className={classes.drawerHeader}>
                    <Typography variant="h5" align="center">Navigation</Typography>
                </Toolbar>
            </Hidden>
            <Divider variant="fullWidth" />
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
        </React.Fragment>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar disableGutters className={classes.headerContainer}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        // edge="start"
                        onClick={() => setDrawerOpen(true)}
                        className={classes.menuButton}
                    >
                        <Menu />
                    </IconButton>
                    <Typography className={classes.appBarLeft} variant="h4" align={'center'}>
                        Chatbot Wars
                    </Typography>
                    <div className={classes.appBarRight}>
                        {user ?
                            <div className={classes.logoutContainer}>
                                <Hidden xsDown implementation="css">
                                    <Typography variant="h5">Hi, {user.username}</Typography>
                                </Hidden>
                                <ConfirmModal
                                    render={open => (
                                        <IconButton onClick={open} className={classes.logoutButton}>
                                            <ExitToApp />
                                        </IconButton>
                                    )}
                                    onConfirm={signout}
                                    prompt={"Are you sure you want to log out?"}
                                    confirmText={"Logout"}
                                    color={theme.palette.secondary.main}
                                    hoverColor={theme.palette.secondary.dark}
                                />

                            </div>
                            :
                            <Typography component={NavLink} to={"/login"} variant="h5" className={classes.loginLink}>{loaded && "Login"}</Typography>
                        }
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >

                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                {children}
            </main>
        </div >
    );
}
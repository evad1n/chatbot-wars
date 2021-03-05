import { Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import API from 'api';
import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import ConfirmModal from './edit/ConfirmModal';


const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
    },
    botsContainer: {
        paddingTop: 20,
        alignContent: "flex-start"
    },
    noBots: {
        marginTop: "20%",
        marginBottom: 20
    },
    tableContainer: {
        padding: 20
    },
    selectBot: {
        textDecoration: "none",
        color: "black",
        cursor: "pointer",
        '&:hover': {
            color: "green"
        }
    },
    delete: {
        '&:hover': {
            color: "red"
        }
    },
    loadingContainer: {
        alignContent: "center"
    },
    loading: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexGrow: 1
    }
}));


export default function Edit() {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [bots, setBots] = useState([]);

    const history = useHistory();

    // Fetch bot data
    const getBots = useCallback(
        async () => {
            let response = await API.get('/bots');
            setBots(response.data);
            setLoading(false);
        },
        [],
    );

    const selectBot = (id) => {
        history.push(`/workshop/edit/${id}`);
    };

    useEffect(() => {
        getBots();
    }, [getBots]);


    const deleteBot = async (id) => {
        await API.delete(`/bots/${id}`);
        getBots();
    };

    return (
        <Grid container className={classes.container}>
            {loading ? (
                <Grid item xs={12} className={classes.loading}>
                    <CircularProgress color="secondary" />
                </Grid >
            ) : (
                <Grid container item xs={12} className={classes.botsContainer}>
                    {bots.length > 0 ? (
                        <React.Fragment>
                            <Grid item xs={12} >
                                <Typography variant={'h5'} align={'center'}>Select a bot to edit</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.tableContainer}>
                                <TableContainer component={Paper} >
                                    <Table stickyHeader>
                                        <colgroup>
                                            <col style={{ width: '80%' }} />
                                            <col style={{ width: '20%' }} />
                                        </colgroup>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell align={'center'}>Delete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bots.map((bot, index) => (
                                                <TableRow key={index} hover>
                                                    <TableCell className={classes.selectBot} onClick={() => { selectBot(bot.id); }} align={'left'}>
                                                        {bot.name}
                                                    </TableCell>
                                                    <TableCell align={'center'}>
                                                        <ConfirmModal onConfirm={() => deleteBot(bot.id)} type={"bot"} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Grid item xs={12} className={classes.noBots}>
                                <Typography variant={'h4'} align={'center'}>You haven't created any bots</Typography>
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: "center" }}>
                                <Button component={RouterLink} to={"/workshop/create"} variant={'contained'} color={'secondary'}>Create a bot</Button>
                            </Grid>
                        </React.Fragment>
                    )
                    }
                </Grid>
            )}
        </Grid >
    );
}

import { Button, Dialog, DialogActions, DialogTitle, Grid, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import API, { moods } from 'api';
import React, { useState } from 'react';
import LineInput from '../create/LineInput';
import ConfirmModal from './ConfirmModal';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    container: {
        height: "70%"
    },
    row: {
        overflowWrap: 'break-word'
    },
    delete: {
        '&:hover': {
            color: "red"
        }
    },
}));

const badLength = "Question must be non-empty";


export default function LineTable({ botID, lineType, lines, min, refresh }) {
    const classes = useStyles();
    const [line, setLine] = useState({
        text: "",
        mood: 0
    });
    const [error, setError] = useState(false);
    const [errorMsgs, setErrorMsgs] = useState([]);
    const [open, setOpen] = useState(false);


    const changeLine = ({ text, mood }) => {
        setLine({
            text: text !== undefined ? text : line.text,
            mood: mood !== undefined ? mood : line.mood
        });
    };

    const clearInputs = () => {
        setLine({
            text: "",
            mood: 0
        });
    };

    const validate = () => {
        setError(false);
        let errorMessages = [];

        const validText = line.text.length > 0;
        if (!validText) {
            errorMessages.push(badLength);
            setError(true);
        }
        setErrorMsgs(errorMessages);

        if (!validText)
            return;
        addLine();
    };

    const addLine = async () => {
        try {
            await API.post(`/bots/${botID}/${lineType}`, line);
            refresh();
            clearInputs();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteLine = async (index) => {
        if (lines.length <= min) {
            setOpen(true);
            return;
        }
        await API.delete(`/bots/${botID}/${lineType}/${index}`);
        refresh();
    };

    return (
        <React.Fragment>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>
                    Must have at least {min} {lineType}
                </DialogTitle>
                <DialogActions style={{ justifyContent: "center" }}>
                    <Button autoFocus onClick={() => setOpen(false)} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
            <Grid item xs={12} className={classes.container}>
                <TableContainer component={Paper}>
                    <Table stickyHeader>
                        <colgroup>
                            <col style={{ width: '80%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '10%' }} />
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell align={'center'}>
                                    Text
                        </TableCell>
                                <TableCell align={'center'}>
                                    Mood
                            </TableCell>
                                <TableCell align={'center'}>
                                    Delete
                            </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lines.map((line, index) => (
                                <TableRow hover key={index} className={classes.row}>
                                    <TableCell align={'left'}>
                                        {line.text}
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        {moods[line.mood]}
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        <ConfirmModal
                                            render={open => (
                                                <IconButton onClick={open} className={classes.delete}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                            onConfirm={() => deleteLine(index)}
                                            prompt={"Are you sure you want to delete this line?"}
                                            confirmText={"Delete"}
                                            color={"red"}
                                            hoverColor={"darkred"}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid container spacing={3} item xs={12}>
                <LineInput label={`Add ${lineType.substr(0, -1)}`} error={error} errorMessages={errorMsgs} line={line} updateLine={changeLine} />
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button onClick={validate} fullWidth size={"large"} variant={'contained'} color={'secondary'}>Add</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

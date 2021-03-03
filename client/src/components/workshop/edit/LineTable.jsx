import { Button, Grid, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import API from 'api';
import React, { useState } from 'react';
import LineInput from '../create/LineInput';

const useStyles = makeStyles((theme) => ({
    tableRow: {
        height: "70%"
    },
    table: {
        // maxWidth: "100%",
    },
    row: {
        overflowWrap: 'anywhere'
    },
    delete: {
        '&:hover': {
            color: "red"
        }
    },
}));

const moods = [
    "Happy",
    "Angry",
    "Sad"
];

const badLength = "Question must be non-empty";


export default function LineTable({ botID, lineType, lines, refresh }) {
    const classes = useStyles();
    const [line, setLine] = useState({
        text: "",
        mood: 0
    });
    const [error, setError] = useState(false);
    const [errorMsgs, setErrorMsgs] = useState([]);

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
        await API.delete(`/bots/${botID}/${lineType}/${index}`);
        refresh();
    };

    return (
        <React.Fragment>
            <Grid item xs={12} className={classes.tableRow}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} stickyHeader>
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
                                        <IconButton className={classes.delete} onClick={() => deleteLine(index)}>
                                            <DeleteIcon />
                                        </IconButton>
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

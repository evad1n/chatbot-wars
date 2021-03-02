import { IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        margin: 20
    },
    table: {
        maxWidth: "100%",
    },
    delete: {
        '&:hover': {
            color: "red"
        }
    }
}));

const fake = [
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
    { text: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", mood: 2 },
];

const moods = [
    "Happy",
    "Angry",
    "Sad"
];

export default function LineTable({ lines, update }) {
    const classes = useStyles();

    const deleteLine = (line) => {
        console.log(line);
    };

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>
                            soe word
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
                    {fake.map((line, index) => (
                        <TableRow hover>
                            <TableCell align={'center'}>
                                {line.text}
                            </TableCell>
                            <TableCell align={'center'}>
                                {moods[line.mood]}
                            </TableCell>
                            <TableCell align={'center'}>
                                <IconButton className={classes.delete} onClick={() => deleteLine(line)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

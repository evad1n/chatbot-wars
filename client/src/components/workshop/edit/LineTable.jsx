import { IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import API from 'api';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        margin: 20
    },
    table: {
        maxWidth: "100%",
    },
    row: {
        overflowWrap: 'anywhere'
    },
    delete: {
        '&:hover': {
            color: "red"
        }
    }
}));

const moods = [
    "Happy",
    "Angry",
    "Sad"
];

export default function LineTable({ botID, lineType, lines, refresh }) {
    const classes = useStyles();

    const deleteLine = async (index) => {
        await API.delete(`/bots/${botID}/${lineType}/${index}`);
        refresh();
    };

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
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
    );
}

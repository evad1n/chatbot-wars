import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 30
    }
}));

export default function Create() {
    const classes = useStyles();

    return (
        <div>
            <Typography className={classes.title} align={'center'}>WELCOME TO THE WORKSHOP</Typography>
        </div>
    );
}

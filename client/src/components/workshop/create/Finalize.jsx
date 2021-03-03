import { Grid, Typography } from '@material-ui/core';
import React from 'react';

export default function Finalize() {
    return (
        <React.Fragment>
            <Grid item container spacing={3} alignContent="space-around" style={{ textAlign: "center", height: "100%" }}>
                <Grid item xs={12} >
                    <Typography variant={'h6'} >That's a good start.
                </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant={'h6'} >
                        You can keep working on your bot anytime by going back to the workshop.
                </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant={'h6'} >
                        Click 'To Glory' to send your bot to the battlefield!
                </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

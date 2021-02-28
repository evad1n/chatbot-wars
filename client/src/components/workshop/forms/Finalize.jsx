import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';

export default function Finalize() {
    return (
        <Grid container spacing={3} alignContent="space-around" style={{ textAlign: "center", height: "100%" }}>
            <Grid item xs={12} >
                <Typography variant={'h6'} >That's a good start.
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography variant={'h6'} >
                    You can keep working on your bot anytime by going back to the workshop.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button style={{ fontSize: 20 }} fullWidth size="large" variant="contained" color="secondary">To Glory</Button>
            </Grid>
        </Grid>
    );
}

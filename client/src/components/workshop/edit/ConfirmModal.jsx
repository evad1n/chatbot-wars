import { Button, Dialog, DialogActions, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';

const useStyles = makeStyles({
    delete: {
        '&:hover': {
            color: "red"
        }
    }
});

export default function ConfirmModal({ onConfirm, type }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    return (
        <React.Fragment>
            <IconButton className={classes.delete} onClick={handleOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle >Are you sure you want to delete this {type}?</DialogTitle>
                <DialogActions style={{ justifyContent: "center" }}>
                    <Button autoFocus onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleConfirm} color="primary" className={classes.delete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

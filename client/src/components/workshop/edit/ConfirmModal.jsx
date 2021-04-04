import { Button, Dialog, DialogActions, DialogTitle, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    confirmButton: {
        backgroundColor: props => props.color,
        '&:hover': {
            backgroundColor: props => props.hoverColor
        }
    }
}));

export default function ConfirmModal(props) {
    const { onConfirm, prompt, confirmText, render } = props;
    const classes = useStyles(props);

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
            {render && render(handleOpen)}
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle >{prompt}</DialogTitle>
                <DialogActions style={{ justifyContent: "center", marginBottom: 10 }}>
                    <Button autoFocus onClick={handleClose} variant="contained" color="primary">Cancel</Button>
                    <Button
                        onClick={handleConfirm}
                        variant="contained"
                        className={classes.confirmButton} >{confirmText}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

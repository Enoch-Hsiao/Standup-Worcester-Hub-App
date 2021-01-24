import React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    circularProgress: {
        marginTop: theme.spacing(2),
    },
}));

export default function LoadingSpinnerNoBackground() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography style={{marginTop: '10px'}} align="center" variant="h3">
                Loading ...
            </Typography>
            <CircularProgress className={classes.circularProgress} size={100} />
        </div>
    );
}

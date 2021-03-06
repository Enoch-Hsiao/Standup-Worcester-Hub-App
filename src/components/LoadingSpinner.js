import React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WorcesterBackground from '../Images/WorcesterBackground.jpg';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundImage: `url(${WorcesterBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    circularProgress: {
        marginTop: theme.spacing(2),
    },
}));

export default function LoadingSpinner() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography style={{marginTop: '10px'}} align="center" variant="h3">
                Logging in ...
            </Typography>
            <CircularProgress className={classes.circularProgress} size={100} />
        </div>
    );
}

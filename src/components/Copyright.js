import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
    return (
        <Typography align="center">
            Copyright © StartUp Worcester Hub {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

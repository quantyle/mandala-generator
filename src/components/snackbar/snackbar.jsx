import * as React from 'react';
import {
    Snackbar as MUISnackbar,
} from '@mui/material'

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbar(props) {
    const { severity, message, open, handleClose } = props;
    // severity can either be: error, warning, info, or success

    return (
        <MUISnackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </MUISnackbar>
    );
}
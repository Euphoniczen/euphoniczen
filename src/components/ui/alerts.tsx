"use client"

import Alert from '@mui/material/Alert';

interface AlertInterface {
    successMessage: string
    errorMessage: string
}

const AlertStyle: React.CSSProperties = {
    position: 'absolute',
    top: 2, 
    right: 2
}

export const SuccessAlert = ({successMessage}:AlertInterface) => {
    return <Alert severity="success" style={AlertStyle}
        sx={{
            
        }}
    >{successMessage}</Alert>
}

export const ErrorAlert = ({errorMessage}:AlertInterface) => {
    return <Alert severity="error" style={AlertStyle}
        sx={{

        }}
    >{errorMessage}</Alert>
}
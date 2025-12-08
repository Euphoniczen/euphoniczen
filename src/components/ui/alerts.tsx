"use client"

import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


interface AlertInterface {
    successMessage?: string
    errorMessage?: string
}

const AlertStyle: React.CSSProperties = {
    position: 'absolute',
    top: 10, 
    right: 20
}

export const SuccessAlert = ({successMessage}:AlertInterface) => {
    return <Alert severity="success"
        sx={{
            ...AlertStyle, 
            border: 'solid 2px var(--darkerPurple)',
            borderRadius: '6px',
            background: 'var(--darkerPurple_semi)',
            color: 'var(--textColor2)',
            padding: '0px 20px',
            fontWeight: '600',
            '& .MuiAlert-icon': {
                color: 'var(--textColor2)'
            }
        }}
    >{successMessage}</Alert>
}

export const ErrorAlert = ({errorMessage}:AlertInterface) => {
    return <Alert severity="error"
        sx={{
            ...AlertStyle, 
            border: 'solid 2px var(--kindaOrange)', 
            borderRadius: '6px',
            background: 'var(--kindaOrange_semi)',
            color: 'var(--textColor2)',
            padding: '0px 20px',
            fontWeight: '600',
            '& .MuiAlert-icon': {
                color: 'var(--textColor2)'
            }
        }}
    >{errorMessage}</Alert>
}
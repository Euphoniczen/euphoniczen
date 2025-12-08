"use client"

import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useState, useEffect } from 'react';

interface AlertInterface {
    successMessage?: string
    errorMessage?: string
}

const AlertStyle: React.CSSProperties = {
}

export function SuccessAlert({ successMessage }: { successMessage: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {

    setShow(false)

    setTimeout(() => setShow(true), 20);

    const timer = setTimeout(() => setShow(false), 2800);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const animationStyle: React.CSSProperties = {
    position: "absolute",
    top: 10,
    right: 20,
    transition: "transform 0.4s ease, opacity 0.4s ease",
    opacity: show ? 1 : 0,
    transform: show ? "translateX(0)" : "translateX(40px)",
    pointerEvents: "none",
  };

  return (
    <div style={animationStyle}>
      <Alert severity="success"
        sx={{
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
    </div>
  );
}



export function ErrorAlert({ errorMessage }: { errorMessage: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {

    setShow(false)

    setTimeout(() => setShow(true), 20);

    const timer = setTimeout(() => setShow(false), 2800);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const animationStyle: React.CSSProperties = {
    position: "absolute",
    top: 10,
    right: 20,
    transition: "transform 0.4s ease, opacity 0.4s ease",
    opacity: show ? 1 : 0,
    transform: show ? "translateX(0)" : "translateX(40px)",
    pointerEvents: "none",
  };

  return (
    <div style={animationStyle}>
      <Alert severity="error"
        sx={{
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
    </div>
  );
}
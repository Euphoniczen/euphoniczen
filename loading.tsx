'use client';

import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <CircularProgress style={{ color: 'var(--textColor1of1)'}} />
    </div>
  );
}
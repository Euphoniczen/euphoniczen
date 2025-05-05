"use client"

export default function NotificationBar() {

    const notiStyle: React.CSSProperties = {
        width: '100%',
        height: 'fit-content',
        backgroundColor: 'var(--textColor2)',
        color: 'var(--textColor1of1)',
        fontFamily: 'var(--fontFamily1)',
        fontWeight: '700',
        padding: '5px',
        display: 'block',
        // position: 'absolute',
        zIndex: '99999',
    }

    return(<>
        <div style={notiStyle}>
            <p>This application is currently in beta. Filtering is limited to a maximum of 5 playlists at this time.</p>
        </div>
    </>)
}
import React from 'react'

export const Loader = () => {
    return (
        <div 
            style={{
            width: '100%', height: '100vh', textAlign: 'center', display: 'flex', 
            alignContent: 'center', justifyContent: 'center', justifyItems: 'center',
            alignItems: 'center'
            }} 
        >
            <div className="loader"/>
        </div>
    )
}
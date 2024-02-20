import React from "react";

const Custom404: React.FC = () =>{
    return(
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'Linux Libertine G',
            fontSize: '32px',
            backgroundColor: '#FF2C46'
        }}>
            <img src="/engrenagensclear.png" alt="Engrenagens" style={{width: '15%'}}/>
            <h1 style={{ color: '#FFFF', fontFamily: 'Linux Libertine G'}}>ERROR 404 - Página não encontrada</h1>
        </div>
    );
} 

export default Custom404;
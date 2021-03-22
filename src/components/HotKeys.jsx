import React from 'react';
import HotKey from './HotKey';

export function HotKeys(props){
    
    return(
        <div id='b' className='lines'>
            <HotKey MenuItem='New Game' Key='n'/>
            <HotKey MenuItem='continue' Key='c'/>
            <HotKey MenuItem='settings' Key='s'/>
            <HotKey MenuItem='high scores' Key='h'/>
            <HotKey MenuItem='hot keys' Key='k'/>
            <HotKey MenuItem='go home' Key='q'/>
            <div className='buttons' onClick={()=> props.ChangePage(0)}>Go home</div>
        </div>
    );
}
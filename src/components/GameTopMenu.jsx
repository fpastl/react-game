import React from 'react';

export default function GameTopMenu(props){
    return (
        <div className='info'>
            <div>Score: {props.Score} </div>
            <div>available moves: {props.ComboCount}</div>
        </div>);

}
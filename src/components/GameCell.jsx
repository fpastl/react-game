import React from 'react';

export default function GameCell(props) {

    if(props.id){
    return (
    <div className={props.class+' boardCel'}
        onClick={props.click}
        onMouseOver ={props.mouseOver}
        onMouseOut ={props.mouseOut }
        id={props.id}/>);
    }
    else
    {
        const { ClassStyle } = props;
        return <div className={'boardCel '+ClassStyle} /> 
    }
}
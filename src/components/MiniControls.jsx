import React from 'react';

export function MiniControls(props)
{
    const {PrivatClass} = props;
    const Change=(event)=>{
        props.onClick(event.target.checked,PrivatClass);
    }
    return (<label title={PrivatClass}>
                <input checked={props.checked} type="checkbox" onChange={Change} className={'SoundConrol '+PrivatClass}/>
                <span></span>
            </label>)
}
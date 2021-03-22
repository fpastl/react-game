import React from 'react';

export default function SettingsChanger(props){

    const {name,id,ClassListDiv,value,ClassListLabel,inValue,ChdeckedThis} = props;

    return (
    <div className={'ControlChange'+ (ClassListDiv?ClassListDiv:'')}>
        <input type='radio' id={id} name={name} value={value} defaultChecked={JSON.stringify(ChdeckedThis)==JSON.stringify(value)} onChange={props.onChange}/>
        <label htmlFor={id} className={ClassListLabel} >
            {inValue}
        </label>
    </div>
    );
}
import React from 'react';

export class MainMenu extends React.Component{
    constructor(props){
        super(props);
    }

    pageChange=(val)=>{
        this.props.ChangePage(val);
    }

    render()
    {
        const save= (localStorage.getItem('BoardElements')!==null && localStorage.getItem('Score')!==null && localStorage.getItem('Size')!==null && localStorage.getItem('Elements'));
        return (
            <div id='MainMenu'>
                <div  onClick={()=>this.pageChange(1)} className='buttons'>New game</div>
                <div  onClick={ (save) ? ()=>this.pageChange(2): ()=>false} 
                    className={'buttons'+( !save ?' notActive':'')} >Continue</div>
                <div  onClick={()=>this.pageChange(3)} className='buttons'>Settings</div>
                <div  onClick={()=>this.pageChange(4)} className='buttons'>high scores</div>
                <div  onClick={()=>this.pageChange(5)} className='buttons'>hot keys</div>
            </div>
        );
    }
}
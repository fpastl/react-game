'use strict';

export class MainMenu extends React.Component{
    constructor(props){
        super(props);
    }

    pageChange=(val)=>{
        this.props.ChangePage(val);
    }

    render()
    {
        return (
            <div id='MainMenu'>
                <div  onClick={()=>this.pageChange(1)} className='buttons'>New game</div>
                <div  onClick={()=>this.pageChange(2)} className='buttons'>Continue</div>
                <div  onClick={()=>this.pageChange(3)} className='buttons'>Settings</div>
            </div>
        );
    }


}
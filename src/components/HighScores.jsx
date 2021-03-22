import React from 'react';
import SettingsChanger from './SettingsChanger';
import ResultOutput from './ResultOutput';

export class HighScores extends React.Component{

    constructor(props){
        super(props);
        this.state = {Size:this.props.Size};
    }

    changeParam = (value) =>{
        this.setState({Size:value});
    }

    render(){
        const {Size}=this.state;
    return(
        <div id='b' className='lines'>
        <div id='size' className='Row ChangeBlock'>
            <SettingsChanger key='e1' id='e1' name='size' value={[10,10]} inValue={'10x10'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Size}  onChange={()=>this.changeParam([10,10])}/>
            <SettingsChanger key='e2' id='e2' name='size' value={[15,15]} inValue={'15x15'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Size}  onChange={()=>this.changeParam([15,15])}/>
            <SettingsChanger key='e3' id='e3' name='size' value={[20,20]} inValue={'20x20'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Size}  onChange={()=>this.changeParam([20,20])} />
        </div>
        <ResultOutput Size={Size} />
        <div className='buttons' onClick={()=> this.props.ChangePage(0)}>Go home</div>
        </div>
    );}
}
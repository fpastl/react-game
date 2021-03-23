import React from 'react';
import SettingsChanger from './SettingsChanger';
import GameCell from './GameCell';

export class Settings extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Theme: this.props.Theme,
            Elements: this.props.Elements,
            BoardSize: this.props.BoardSize
        };
        this.customization={
            theme: (value)=>{
                this.setState({Theme: value});
            },
            size: (value)=>{
                this.setState({BoardSize: value});
            },
            elements: (value)=>{
                this.setState({Elements: value});
            },
        };
    }

    saveSettings=(val)=>{
        const {Theme,Elements,BoardSize}=this.state;
        this.props.SettingsChange(Theme,Elements,BoardSize);
        this.props.ChangePage(val);
    }

    settingChange=(name,value)=>
    {
       this.customization[name](value);
    }

    render()
    {
        const theme=['color','iconColor','icon'];
        const {Theme,Elements,BoardSize}=this.state;
        let cellColor=[],cellIcon=[],cellIconColor=[];
            for(let j=0;j<20;j++)
            {
                cellColor[j] = (<GameCell key={'cellColor'+j} ClassStyle={theme[0]+((j%5)+1)}/>);
                cellIconColor[j] = (<GameCell key={'cellIconColor'+j} ClassStyle={theme[1]+((j%5)+1)}/>);
                cellIcon[j] = (<GameCell key={'cellIcon'+j} ClassStyle={theme[2]+((j%5)+1)}/>);
            }

        return (
        <div id='Settings'>
            <div id='theme' className='ChangeBlock'>
                <p>Style of blocks</p>
                <SettingsChanger key='t1' id='t1' name='theme' value={'color'} ClassListLabel={'Row settingsChangerTheme'} inValue={cellColor} ChdeckedThis={Theme} onChange={()=>this.settingChange('theme','color')} />
                <SettingsChanger key='t2' id='t2' name='theme' value={'iconColor'} ClassListLabel={'Row settingsChangerTheme'} inValue={cellIconColor} ChdeckedThis={Theme} onChange={()=>this.settingChange('theme','iconColor')} />
                <SettingsChanger key='t3' id='t3' name='theme' value={'icon'} ClassListLabel={'Row settingsChangerTheme'} inValue={cellIcon} ChdeckedThis={Theme} onChange={()=>this.settingChange('theme','icon')} />
            </div>
            <div id='size' className='Row ChangeBlock'>
                <p>Size of board</p>
                <SettingsChanger key='e1' id='e1' name='size' value={[10,10]} inValue={'10x10'} ClassListLabel=                    {'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={BoardSize}  onChange={()=>this.settingChange('size',[10,10])} />
                <SettingsChanger key='e2' id='e2' name='size' value={[15,15]} inValue={'15x15'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={BoardSize}  onChange={()=>this.settingChange('size',[15,15])} />
                <SettingsChanger key='e3' id='e3' name='size' value={[20,20]} inValue={'20x20'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={BoardSize}  onChange={()=>this.settingChange('size',[20,20])} />
            </div>
            <div id='elements' className='Row ChangeBlock'>
                <p>number of blocks</p>
                <SettingsChanger key='s1' id='s1' name='elements' value={3} inValue={3} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Elements}  onChange={()=>this.settingChange('elements',3)} />
                <SettingsChanger key='s2' id='s2' name='elements' value={4} inValue={4} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Elements}  onChange={()=>this.settingChange('elements',4)} />
                <SettingsChanger key='s3' id='s3' name='elements' value={5} inValue={5} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Elements}  onChange={()=>this.settingChange('elements',5)} />
            </div>
            
            <div className='buttons' onClick={()=>this.props.ChangePage(0)}>Go home</div>
            <div className='buttons' onClick={()=>this.saveSettings(0)}>save</div>

        </div>
        );
    }
}

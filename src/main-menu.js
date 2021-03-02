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
        const save= (localStorage.getItem('BoardElements')!==null && localStorage.getItem('Score')!==null && localStorage.getItem('Size')!==null && localStorage.getItem('Elements'));
        return (
            <div id='MainMenu'>
                <div  onClick={()=>this.pageChange(1)} className='buttons'>New game</div>
                <div  onClick={ (save) ? ()=>this.pageChange(2): ()=>false} 
                    className={'buttons'+( !save ?' notActive':'')} >Continue</div>
                <div  onClick={()=>this.pageChange(3)} className='buttons'>Settings</div>
            </div>
        );
    }
}



export class Settings extends React.Component{
        constructor(props){
            super(props);
            this.state={
                Theme: this.props.Theme,
                Elements: this.props.Elements,
                BoardSize: this.props.BoardSize
            };
        }

        pageChange = (val) =>{
            this.props.ChangePage(val);
        }
        saveSettings=()=>{
            const {Theme,Elements,BoardSize}=this.state;
            this.props.SettingsChange(Theme,Elements,BoardSize);
        }

        settingChange=(name,value)=>
        {
            switch(name)
            {
                case 'theme':
                {
                    this.setState({Theme: value});
                    break;
                }
                case 'size':
                {
                    this.setState({BoardSize: value});
                    break;
                }
                case 'elements':
                {
                    this.setState({Elements: value});
                    break;
                }
            }
        }

        render()
        {
            const theme=['color','iconColor','icon'];
            const {Theme,Elements,BoardSize}=this.state;
            let cellColor=[],cellIcon=[],cellIconColor=[];
                for(let j=0;j<20;j++)
                {
                    cellColor[j] = (<CellForSettings ClassStyle={theme[0]+((j%5)+1)}/>);
                    cellIconColor[j] = (<CellForSettings ClassStyle={theme[1]+((j%5)+1)}/>);
                    cellIcon[j] = (<CellForSettings ClassStyle={theme[2]+((j%5)+1)}/>);
                }

            return (
            <div id='Settings'>
                <div id='theme' className='ChangeBlock'>
                    <p>Style of blocks</p>
                    <ChangerTheme key='t1' id='t1' name='theme' value={'color'} ClassListLabel={'Row settingsChangerTheme'} inValue={cellColor} ChdeckedThis={Theme} onChange={this.settingChange} />
                    <ChangerTheme key='t2' id='t2' name='theme' value={'iconColor'} ClassListLabel={'Row settingsChangerTheme'} inValue={cellIconColor} ChdeckedThis={Theme} onChange={this.settingChange} />
                    <ChangerTheme key='t3' id='t3' name='theme' value={'icon'} ClassListLabel={'Row settingsChangerTheme'} inValue={cellIcon} ChdeckedThis={Theme} onChange={this.settingChange} />
                </div>
                <div id='size' className='Row ChangeBlock'>
                <p>Size of board</p>
                <ChangerTheme key='e1' id='e1' name='size' value={[10,10]} inValue={'10x10'} ClassListLabel=                    {'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={BoardSize}  onChange={this.settingChange} />
                    <ChangerTheme key='e2' id='e2' name='size' value={[15,15]} inValue={'15x15'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={BoardSize}  onChange={this.settingChange} />
                    <ChangerTheme key='e3' id='e3' name='size' value={[20,20]} inValue={'20x20'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={BoardSize}  onChange={this.settingChange} />
                </div>
                <div id='elements' className='Row ChangeBlock'>
                <p>number of blocks</p>
                   
                <ChangerTheme key='s1' id='s1' name='elements' value={3} inValue={3} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Elements}  onChange={this.settingChange} />
                        <ChangerTheme key='s2' id='s2' name='elements' value={4} inValue={4} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Elements}  onChange={this.settingChange} />
                        <ChangerTheme key='s3' id='s3' name='elements' value={5} inValue={5} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Elements}  onChange={this.settingChange} />
                </div>
                
                <div className='buttons' onClick={()=>this.pageChange(0)}>Go home</div>
                <div className='buttons' onClick={()=>this.saveSettings(0)}>save</div>

            </div>
            );
        }
    }

    
function ChangerTheme(props){
    const {name,id,ClassListDiv,value,ClassListLabel,inValue,ChdeckedThis} = props;
    console.log(id);
    console.log(value);
    console.log(ChdeckedThis+'=='+value);
    console.log(ChdeckedThis==value);
    return (
    <div className={'ControlChange'+ (ClassListDiv?ClassListDiv:'')}>
        <input type='radio' id={id} name={name} value={value} defaultChecked={JSON.stringify(ChdeckedThis)==JSON.stringify(value)} onChange={()=>props.onChange(name,value)}/>
        <label htmlFor={id} className={ClassListLabel} >
            {inValue}
        </label>
    </div>
    );
}

function CellForSettings(props){
        const { ClassStyle } = props;
        return <div className={'boardCel '+ClassStyle}></div>   
};
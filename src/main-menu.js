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
                <div  onClick={()=>this.pageChange(4)} className='buttons'>high scores</div>
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

        saveSettings=(val)=>{
            const {Theme,Elements,BoardSize}=this.state;
            this.props.SettingsChange(Theme,Elements,BoardSize);
            this.props.ChangePage(val);
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
                    <ChangeSettings key='t1' id='t1' name='theme' value={'color'} ClassListLabel={'Row settingsChangerTheme'} inValue={cellColor} ChdeckedThis={Theme} onChange={()=>this.settingChange('theme','color')} />
                    <ChangeSettings key='t2' id='t2' name='theme' value={'iconColor'} ClassListLabel={'Row settingsChangerTheme'} inValue={cellIconColor} ChdeckedThis={Theme} onChange={()=>this.settingChange('theme','iconColor')} />
                    <ChangeSettings key='t3' id='t3' name='theme' value={'icon'} ClassListLabel={'Row settingsChangerTheme'} inValue={cellIcon} ChdeckedThis={Theme} onChange={()=>this.settingChange('theme','icon')} />
                </div>
                <div id='size' className='Row ChangeBlock'>
                    <p>Size of board</p>
                    <ChangeSettings key='e1' id='e1' name='size' value={[10,10]} inValue={'10x10'} ClassListLabel=                    {'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={BoardSize}  onChange={()=>this.settingChange('size',[10,10])} />
                    <ChangeSettings key='e2' id='e2' name='size' value={[15,15]} inValue={'15x15'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={BoardSize}  onChange={()=>this.settingChange('size',[15,15])} />
                    <ChangeSettings key='e3' id='e3' name='size' value={[20,20]} inValue={'20x20'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={BoardSize}  onChange={()=>this.settingChange('size',[20,20])} />
                </div>
                <div id='elements' className='Row ChangeBlock'>
                    <p>number of blocks</p>
                    <ChangeSettings key='s1' id='s1' name='elements' value={3} inValue={3} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Elements}  onChange={()=>this.settingChange('elements',3)} />
                    <ChangeSettings key='s2' id='s2' name='elements' value={4} inValue={4} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Elements}  onChange={()=>this.settingChange('elements',4)} />
                    <ChangeSettings key='s3' id='s3' name='elements' value={5} inValue={5} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Elements}  onChange={()=>this.settingChange('elements',5)} />
                </div>
                
                <div className='buttons' onClick={()=>this.pageChange(0)}>Go home</div>
                <div className='buttons' onClick={()=>this.saveSettings(0)}>save</div>

            </div>
            );
        }
    }

    
function ChangeSettings(props){

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

function CellForSettings(props){
        const { ClassStyle } = props;
        return <div className={'boardCel '+ClassStyle}></div>   
};

export class HighScores extends React.Component{

    constructor(props){
        super(props);
        this.state = {Size:this.props.Size};
    }

    changeParam = (value) =>{
        this.setState({Size:value});
    }

    pageChange = (val)=>{
        this.props.ChangePage(val);
    }

    render(){
        const {Size}=this.state;
        console.log(Size);
    return(
        <div id='b' className='lines'>
        <div id='size' className='Row ChangeBlock'>
            <ChangeSettings key='e1' id='e1' name='size' value={[10,10]} inValue={'10x10'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Size}  onChange={()=>this.changeParam([10,10])}/>
            <ChangeSettings key='e2' id='e2' name='size' value={[15,15]} inValue={'15x15'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Size}  onChange={()=>this.changeParam([15,15])}/>
            <ChangeSettings key='e3' id='e3' name='size' value={[20,20]} inValue={'20x20'} ClassListLabel={'settingsChangerOther'} ClassListDiv={' LineBlock'} ChdeckedThis={Size}  onChange={()=>this.changeParam([20,20])} />
        </div>
        <ResultOutput Size={Size} />
        <div className='buttons' onClick={()=>this.pageChange(0)}>Go home</div>
        </div>
    );}
}

function ResultOutput(props){
    const {Size}=props;
    console.log('ScoreList'+Size[0]+'x'+Size[1]);
    const scoreList=JSON.parse(localStorage.getItem(('ScoreList'+Size[0]+'x'+Size[1])));
    console.log(scoreList);
    let scoreBoard=[];
    if(scoreList!=null){
        const length=scoreList.length;
        for(let i=0;i<length;i++)
        {
            scoreBoard[i]=<ResultRow data={scoreList[i]} position={i+1} />
        }
        if(length<10){
            for(let i=length;i<10;i++)
            {
                scoreBoard[i]=<ResultRow data={['aaa','0000']} position={i+1} />
            }
        }
    }
    else{
        for(let i=0;i<10;i++)
            {
                scoreBoard[i]=<ResultRow data={['aaa','0000']} position={i+1} />
            } 
    }
    return (
            <table>
                <ResultRow data={['Name','Score']} position={'#'} />
                {scoreBoard}
            </table>
            );
}

function ResultRow(props){
    const {data,position}=props;
    return (
        <tr><td>{position}</td><td>{data[0]}</td><td>{data[1]}</td></tr>
    )
}
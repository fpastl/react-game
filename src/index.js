'use strict';

import { MainMenu, Settings, HighScores, HotKeys} from './main-menu.js';
import { GmaeBoard } from './game.js';

const playList=['Bio Unit - Aerial.mp3','Bio Unit - Fire Flies.mp3'];
var music=new Audio(); 

const PlayMusic =(i,music,playList) =>{
    const current=i%playList.length;
    music.src='./music/'+playList[current];
    music.play();
    music.onended=()=>PlayMusic(current+1,music,playList);
}

class App extends React.Component {

    constructor(props){
        super(props);
        this.state={
            Sound: false,
            Effects: false,
            BoardSize: [20,20],
            Elements: 5,
            Page: 0, //0-main menu,1-new game,2-continue,3-settings
            Theme: 'color'
        };
    }

    componentDidMount = () =>{
        window.addEventListener('keyup',() => this.HotKeys(event));
    }

    HotKeys=(e)=>{
        if(e.target.tagName == 'input' || !['KeyN','KeyC','KeyS','KeyH','KeyQ','KeyK'].includes(e.code)){
            return;
        }
        else
        {
            switch(e.code)
            {
                case 'KeyN':{
                    this.ChangePage(1);
                    break;
                }
                case 'KeyC':{
                    if((localStorage.getItem('BoardElements')!==null && localStorage.getItem('Score')!==null && localStorage.getItem('Size')!==null && localStorage.getItem('Elements'))) this.ChangePage(2);
                    break;
                }
                case 'KeyS':{
                    this.ChangePage(3);
                    break;
                }
                case 'KeyH':{
                    this.ChangePage(4);
                    break;
                }
                case 'KeyK':{
                    this.ChangePage(5);
                    break;
                }
                case 'KeyQ':{
                    if(this.state.page!=0) this.ChangePage(0);
                    break;
                } 
            }
        }
    }

    MusicChange = (checked,sound) =>{
        if(sound=="music") {
            if(checked) PlayMusic(0,music,playList);
            else music.pause();
            this.setState({Sound: checked})
        }
        else this.setState({Effects: checked})
    }

    SelectPage = () =>
    {
        switch(this.state.Page)
        {
            case 1:
                {
                const { BoardSize , Elements , Effects,Theme }=this.state;
                return <GmaeBoard key='board' row={BoardSize[0]} line={BoardSize[1]} howElem={Elements} ChangePage={this.ChangePage} Effects={Effects} theme={Theme} load={false}/>;
                }
            case 2:
                {
                    const { Effects,Theme }=this.state;
                    return <GmaeBoard key='board' load={true} ChangePage={this.ChangePage} Effects={Effects} theme={Theme} 
                    />;
                }
            case 3:
                {
                    const {Theme,Elements,BoardSize}=this.state;
                    return <Settings ChangePage={this.ChangePage} Theme={Theme} Elements={Elements} BoardSize={BoardSize} SettingsChange={this.SettingsChange} />;
                }
            case 4:{
                    return <HighScores Size={this.state.BoardSize} ChangePage={this.ChangePage}/>;
            }
            case 5: {
                    return <HotKeys ChangePage={this.ChangePage}/>
                }
            default:
                return (
                        <MainMenu ChangePage={this.ChangePage} />
                );
        }
    }

    SettingsChange=(Theme,Elements,BoardSize)=>{
        this.setState({
            Theme: Theme,
            Elements: Elements,
            BoardSize: BoardSize
        });
    }

    ChangePage = (page) =>
    {
        this.setState({Page: page});
    }

    ScreenChange = (checked) =>{
       const element=document.documentElement;
        if(checked) {
            if(element.requestFullscreen) {
                element.requestFullscreen();
              } else if(element.webkitrequestFullscreen) {
                element.webkitRequestFullscreen();
              } else if(element.mozRequestFullscreen) {
                element.mozRequestFullScreen();
              }
        }
        else {
            if(document.cancelFullScreen) {
                document.cancelFullScreen();
            } 
            else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } 
            else if(document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    render(){
        const {Page }=this.state;
        return (
            <React.Fragment>
            <div id='controls'>
                <MiniControls onClick={this.ScreenChange} PrivatClass="screen"/>
                { (Page==1 || Page==2)? <MiniControls onClick={this.MusicChange} checked ={this.state.Effects} PrivatClass="effect"/> :'' }
                <MiniControls onClick={this.MusicChange} PrivatClass="music"/> 
            </div>
            {this.SelectPage()}
            <Footer/>
            </React.Fragment>
        );
    }
}

function MiniControls(props)
{
    const {PrivatClass} = props;
    const Change=(event)=>{
        props.onClick(event.target.checked,PrivatClass);
    }
    return (<label title={PrivatClass}>
                <input checked={props.checked} type="checkbox" onClick={Change} className={'SoundConrol '+PrivatClass}/>
                <span></span>
            </label>)
}

function Footer(){
    return(
        <footer>
            <p>
                Created by <a href="https://github.com/fpastl">Stas Smoliar</a> / 2021
            </p>
            <a href="https://rs.school/react/" className='logoRS'><img src='./img/rs_school.svg' /></a>
        </footer>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
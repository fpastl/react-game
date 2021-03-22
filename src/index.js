import React from 'react';
import ReactDOM from 'react-dom';

import { HotKeys } from './components/HotKeys';
import { HighScores } from './components/HighScores';
import { Game } from './components/Game';
import { Footer } from './components/Footer';
import { MainMenu } from './components/MainMenu';
import { Settings } from './components/Settings';
import { MiniControls } from './components/MiniControls';
import { BGMusic } from './components/files'

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

    componentDidMount(){
        window.addEventListener('keyup',() => this.HotKeys(event));
    }

    HotKeys=(e)=>{
        const hotKeysSwitcher={
            KeyN:()=>{
                this.ChangePage(1);
            },
            KeyC:()=>{
                if((localStorage.getItem('BoardElements')!==null && localStorage.getItem('Score')!==null && localStorage.getItem('Size')!==null && localStorage.getItem('Elements'))) this.ChangePage(2);
            },
            KeyS:()=>{
                this.ChangePage(3);
            },
            KeyH:()=>{
                this.ChangePage(4);
            },
            KeyK:()=>{
                this.ChangePage(5);
            },
            KeyQ:()=>{
                if(this.state.page!=0) this.ChangePage(0);
            } 
        };
        if(e.target.tagName == 'INPUT' || !hotKeysSwitcher.hasOwnProperty(e.code)){
            return;
        }
        else
        {
            hotKeysSwitcher[e.code]();
        }
    }

    MusicChange = (checked,sound) =>{
        if(sound=="music") {
            if(checked) BGMusic.Play(0);
            else BGMusic.Pause();
            this.setState({Sound: checked})
        }
        else this.setState({Effects: checked})
    }

    SelectPage = () =>
    {
        const pageSwitcher=[
            //0
            ()=>{
                return <MainMenu ChangePage={this.ChangePage} />
            },
            //1
            ()=>{
                const { BoardSize , Elements , Effects,Theme }=this.state;
                return <Game key='board' row={BoardSize[0]} line={BoardSize[1]} howElem={Elements} ChangePage={this.ChangePage} Effects={Effects} theme={Theme} load={false}/>;
            },
            //2
            ()=>{
                 const { Effects,Theme }=this.state;
                 return <Game key='board' load={true} ChangePage={this.ChangePage} Effects={Effects} theme={Theme} 
                    />;
            },
            //3
            ()=>{
                const {Theme,Elements,BoardSize}=this.state;
                return <Settings ChangePage={this.ChangePage} Theme={Theme} Elements={Elements} BoardSize={BoardSize} SettingsChange={this.SettingsChange} />;
            },
            //4
            ()=>{
                return <HighScores Size={this.state.BoardSize} ChangePage={this.ChangePage}/>
            },
            //5
            ()=>{
                return <HotKeys ChangePage={this.ChangePage}/>
            }, 
        ];
       return pageSwitcher[this.state.Page](); 
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


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
'use strict';

import { MainMenu, Settings, HighScores } from './main-menu.js';
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
                const { BoardSize , Elements , Effects }=this.state;
                return <GmaeBoard key='board' row={BoardSize[0]} line={BoardSize[1]} howElem={Elements} ChangePage={this.ChangePage} Effects={Effects} theme={this.state.Theme} load={false}/>;
                }
            case 2:
                {
                    const { Effects }=this.state;
                    return <GmaeBoard key='board' load={true} ChangePage={this.ChangePage} Effects={Effects} theme={this.state.Theme} 
                    />;
                }
            case 3:
                {
                    const {Theme,Elements,BoardSize}=this.state;
                    return <Settings ChangePage={this.ChangePage} Theme={Theme} Elements={Elements} BoardSize={BoardSize} SettingsChange={this.SettingsChange} />;
                }
            case 4:
                return <HighScores Size={this.state.BoardSize} ChangePage={this.ChangePage}/>;
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

    render(){
        const {Page }=this.state;
        return (
            <React.Fragment>
            <div id='sound'>
                { (Page==1 || Page==2)? <SoundConrol onClick={this.MusicChange} sound="effect"/> :'' }
                <SoundConrol onClick={this.MusicChange} sound="music"/> 
            </div>
            {this.SelectPage()}
            <Footer/>
            </React.Fragment>
        );
    }
}




function SoundConrol(props)
{
    const {sound} = props;
    const Change=(event)=>{
        props.onClick(event.target.checked,sound);
    }
    return (<label title={sound}>
                <input type="checkbox" onClick={Change} className={'SoundConrol '+sound}/>
                <span></span>
            </label>)
}

function Footer(props){
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
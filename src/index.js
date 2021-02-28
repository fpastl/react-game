'use strict';

import { MainMenu } from './main-menu.js';
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
            Page: 1 //0-main menu,1-new game,2-continue,3-settings
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
                return <GmaeBoard key='board' row={BoardSize[0]} line={BoardSize[1]} howElem={Elements} ChangePage={this.ChangePage} Effects={Effects}/>;
                }
            case 2:
                {
                    const { BoardSize , Elements }=this.state;
                    return <GmaeBoard key='board' row={BoardSize[0]} line={BoardSize[1]} howElem={Elements} load={true} ChangePage={this.ChangePage} Effects={Effects}
                    />;
                }
            case 3:
                return <Settings ChangePage={this.ChangePage}/>;
            default:
                return <MainMenu ChangePage={this.ChangePage}/>;
        }
    }


    ChangePage = (page) =>
    {
        console.log(page);
        this.setState({Page: page});
    }

    render(){
        
        return (
            <React.Fragment>
            <div id='sound'>
                <SoundConrol onClick={this.MusicChange} sound="effect"/> 
                <SoundConrol onClick={this.MusicChange} sound="music"/> 
            </div>

                {this.SelectPage()}
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





ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
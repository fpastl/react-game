'use strict';

import {findAllCombo, clearAnimation, crushElements, generateBoard} from './functionsForGame.js';

var effect=new Audio('./music/effect.mp3');
var effect_second=new Audio('./music/effect_second.mp3');
var effect_new_game=new Audio('./music/effect_new_game.mp3');
//блок
function Cell(params) {
    return (
    <div className={params.class+' boardCel'}
        onClick={params.click}
        onMouseOver ={params.mouseOver}
        onMouseOut ={params.mouseOut }
        id={params.id}></div>);
}

function EndGame(props) {
    
    const [name,setName]=React.useState('NAME');
    const {Size, Score}=props;

    const changeName = (e) =>
    {
        let inputName=e.target.value;
        inputName=inputName? inputName: 'NAME';
        setName(inputName);
    }

    const Save=()=>
    {
        console.log(name);

        const ScoreListName='ScoreList'+Size[0]+'x'+Size[1];
        console.log(ScoreListName);

        let ScoreList=JSON.parse(localStorage.getItem(ScoreListName));
        console.log(ScoreList);

        if(ScoreList)
        {
            ScoreList.push([name, Score]);
            ScoreList.sort(
                (a,b)=>{
                    if(+a[1]>(+b[1])) return 1;
                    else return -1;
                }
            );
            if(ScoreList.length>10)
            {
                ScoreList.pop();
            }
        }
        else
        {
            ScoreList=[[name, Score]];
        }
        console.log(ScoreList);
        localStorage.setItem(ScoreListName,JSON.stringify(ScoreList));
        localStorage.removeItem('Score');
        props.NewGame();

    }
    return (
        <div id='endGame' className='lines'>
            <p>moves are over</p>
            <p>your score: {Score}</p>
            <p>your name:<input maxLength='7' id='endGameName' placeholder='name' onChange={changeName}/> </p>
            <div className='buttons' onClick={()=>Save()}>save</div>
        </div>
    );
}

//"доска" с блоками
export class GmaeBoard extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            BoardElements: [], //доска
            ActiveElements: [], //матрица с комбинациями
            ListCombo: [], //список комбинаций
            ActiveCombo: '', //текущая выделенная комбинация
            Score : 0,
            Size: [props.row,props.line],
            Elements: props.howElem,
            Load: false
        }
    }

    calculateScore =(x)=>
    {
        const { Size, Elements } = this.state;
        return 10*Elements*x+200*Elements*Math.round(x/(Size[0]*Size[1]));
    }

    SaveGame=()=>{
        
        const {BoardElements,Score,Size,Elements}=this.state;
        localStorage.setItem('Score',Score);
        localStorage.setItem('BoardElements',JSON.stringify(BoardElements));
        localStorage.setItem('Size',JSON.stringify(Size));
        localStorage.setItem('Elements',Elements);
    }

    componentDidMount=()=>{
        
        if(this.state.Load == this.props.load){
        const structure = this.startGenerateBoard();  //[0] - BoardElements, [1][0] - ListCombo, [1][1]-ActiveElements
        console.log(structure); 
        if(this.props.Effects) effect_new_game.play();
        this.setState({
            BoardElements: structure[0],
            ListCombo: structure[1][0],
            ActiveElements: structure[1][1],
            Score : 0
        });
        }
        else{
            
            const BoardElements=JSON.parse(localStorage.BoardElements),
            Score=JSON.parse(localStorage.Score),
            Size=JSON.parse(localStorage.Size),
            Elements=JSON.parse(localStorage.Elements);
            console.log('tut');
            console.log(BoardElements);
            const boardCombo = findAllCombo(JSON.parse(JSON.stringify(BoardElements)));
            this.setState({BoardElements: BoardElements,
                            ActiveElements: boardCombo[1],
                            ListCombo:boardCombo[0],
                            Score:Score,
                            Size:Size,
                            Elements:Elements,
                            Load: true});
        }
    }

    //стартовоя доска
    startGenerateBoard = () =>{
        const board = generateBoard(this.state.Size[0],this.state.Size[1],this.state.Elements);
        const boardCombo = findAllCombo(JSON.parse(JSON.stringify(board)));
        return [board,boardCombo];
    }

    //процесс крушения
    processingCrush = (comboIndex) =>
    {

        if(this.props.Effects) effect.play();
        document.getElementById('root').classList.add('disactive');

        let boardUpdate=JSON.parse(JSON.stringify(this.state.BoardElements));
        const combo=this.state.ListCombo[comboIndex];
        const lengthCombo=combo.length;
        console.log("lengthCombo");
        console.log(lengthCombo);
        const removeStyleList=crushElements(boardUpdate,combo);
        const boardCombo = findAllCombo(JSON.parse(JSON.stringify(boardUpdate)));
        setTimeout(()=>{
                    clearAnimation(removeStyleList[0]);
                    if(removeStyleList[1] && this.props.Effects) effect_second.play();
                    document.getElementById('root').classList.remove('disactive');
                            this.setState((state)=>({
                                BoardElements: boardUpdate,
                                ListCombo: boardCombo[0],
                                ActiveElements: boardCombo[1],
                                ActiveCombo:[],
                                Score: +state.Score+(+this.calculateScore(lengthCombo))}),()=>this.SaveGame()); 
        },300);

    }

    //подсвечивание комбинации для выбранного элемента
    selectCombo = (combo) =>{
        this.setState({ActiveCombo: combo});
    }

    //снятие подсвечивания комбинации
    outSelect = () =>{
        this.setState({ActiveCombo: []});
    }

    //преобразование массива в блоки
    arrayToJsx = (arr,iRow,ComboArray,active,theme) =>
    {
        
        arr=arr.map((cel,key)=>{    
                                    const position=iRow+'-'+key;
                                    const combo=ComboArray[iRow][key];
                                    return (
                                    <Cell key={position} id={position}
                                        class={theme+cel+' '+ (!cel ? 'hidden ': ((combo===active)? 'activeCel ':''))}
                                        click={combo? ()=>this.processingCrush(combo): (() => false)}
                                        mouseOver={combo? (()=>this.selectCombo(combo)) : (() => false)}
                                        mouseOut={combo? ()=>this.outSelect() : (() => false)}
                                       combo={combo}
                                    />
                                    )
                                });
        return <div key={iRow} className='Row'>{arr}</div>;
    }

    pageChange=(val)=>{
       this.props.ChangePage(val);
    }

    render(){

        const {Score, ListCombo, Size}=this.state;
        const ComboCount=(Object.keys(ListCombo).length);
        let Board = JSON.parse(JSON.stringify(this.state.BoardElements));

        const ComboArray=this.state.ActiveElements;

        const active = this.state.ActiveCombo;

        for(let i=0;i<Board.length;i++){
            const {theme} = this.props;
            Board[i]=this.arrayToJsx(Board[i],i,ComboArray,active,theme);
        }
        
        
        return (<div id="b">
                <div className='buttons' onClick={()=>this.pageChange(0)}>Go home</div>
                <div className='buttons' onClick={()=>this.componentDidMount()}>new game</div>
                <TopMenu 
                    Score={Score}
                    ComboCount={ComboCount}
                />
                    <div id='board' className='lines'>
                        {Board}
                        { ComboCount ? '' : <EndGame Score={Score} Size={Size} NewGame={this.componentDidMount}/> }
                    </div>
                </div>);
    }


} 

function TopMenu(props){
    return (
        <div className='info'>
            <div>Score: {props.Score} </div>
            <div>available moves: {props.ComboCount}</div>
        </div>);

}
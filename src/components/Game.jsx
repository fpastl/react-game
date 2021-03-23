import React from 'react';
import GameCell from './GameCell';
import GameEnd from './GameEnd';
import GameTopMenu from './GameTopMenu';
import { effect_crush, effect_new_game, effect_move } from './files';
import {findAllCombo, clearAnimation, crushElements, generateBoard, randomNumber} from './functionsForGame';

export class Game extends React.Component{

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
            Load: false,
            Autoplay: false
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


    updateBoard = () =>{

        if(this.state.Load == this.props.load){
            clearAnimation();
            this.clearTimers();
            document.getElementById('board').classList.remove('disactive');
            const structure = this.startGenerateBoard();  //[0] - BoardElements, [1][0] - ListCombo, [1][1]-ActiveElements
            if(this.props.Effects) effect_new_game.play();
            this.setState({
                BoardElements: structure[0],
                ListCombo: structure[1][0],
                ActiveElements: structure[1][1],
                Score : 0,
                Autoplay:false
            });
            }
            else{
                
                const BoardElements=JSON.parse(localStorage.BoardElements),
                Score=JSON.parse(localStorage.Score),
                Size=JSON.parse(localStorage.Size),
                Elements=JSON.parse(localStorage.Elements);
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


    componentDidMount(){
        this.AutoGameTimer=0;
        this.updateTimer=0;
        this.updateBoard();
    }

    componentWillUnmount=()=>{

        this.clearTimers();
        document.getElementById('board').classList.remove('disactive');
    }

    clearTimers=()=>{
        clearTimeout(this.AutoGameTimer);
        clearTimeout(this.updateTimer);
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
        if(this.props.Effects) effect_crush.play();
        document.getElementById('board').classList.add('disactive');

        let boardUpdate=JSON.parse(JSON.stringify(this.state.BoardElements));
        const combo=this.state.ListCombo[comboIndex];
        const lengthCombo=combo.length;
        const removeStyleList=crushElements(boardUpdate,combo);
        const boardCombo = findAllCombo(JSON.parse(JSON.stringify(boardUpdate)));
        this.updateTimer=setTimeout(()=>{
                    clearAnimation(removeStyleList[0]);
                    if(removeStyleList[1] && this.props.Effects) effect_move.play();
                    if(!this.state.Autoplay) document.getElementById('board').classList.remove('disactive');
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
                                    <GameCell key={position} id={position}
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

    autoChangeCombo=()=>{
        const {ListCombo}=this.state;
        const comboLenght=Object.keys(ListCombo).length;
        if (comboLenght>0){
            var actualCombo, i=1, rand;
            rand=randomNumber(comboLenght);
            for(let combo in ListCombo){
                if(i==rand) {
                    actualCombo=combo;
                    break;
                }
                i++;
            }
            this.selectCombo(actualCombo);
            this.AutoGameTimer=setTimeout(this.autoCrush,300,actualCombo);
        } 
        else {
                document.getElementById('board').classList.remove('disactive')
                this.setState({Autoplay:false})}
            ;  
    }

    autoCrush=(actualCombo)=>{
        this.processingCrush(actualCombo);
        this.AutoGameTimer=setTimeout(this.autoPlay,100);
    }

    autoPlay=()=>{
        if(this.state.Autoplay)  this.AutoGameTimer=setTimeout(this.autoChangeCombo,300);
        else this.updateBoard;
    }


    render(){

        const {Score, ListCombo, Size, Autoplay}=this.state;
        const ComboCount=(Object.keys(ListCombo).length);
        let Board = JSON.parse(JSON.stringify(this.state.BoardElements));

        const ComboArray=this.state.ActiveElements;

        const active = this.state.ActiveCombo;

        for(let i=0;i<Board.length;i++){
            const {theme} = this.props;
            Board[i]=this.arrayToJsx(Board[i],i,ComboArray,active,theme);
        }
        
        
        return (<div id="GameSpace">
                <div className='buttons' onClick={()=> this.props.ChangePage(0)}>Go home</div>
                <div className='buttons' onClick={this.updateBoard}>new game</div>
                <div className='buttons' 
                onClick={()=>{this.setState((state)=>({Autoplay:!state.Autoplay}),
                                            ()=>{document.getElementById('board').classList.add('disactive');
                                                this.autoPlay()})}}>
                                                { Autoplay? 'stop autoplay': 'autoplay'}
                                                </div>
                <GameTopMenu Score={Score} ComboCount={ComboCount}/>
                    <div id='board' className='lines'>
                        {Board}
                        { ComboCount ? '' : <GameEnd Score={Score} Size={Size} NewGame={this.updateBoard}/> }
                    </div>
                </div>);
    }


} 


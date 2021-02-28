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
        id={params.id}>
        
        {params.value}
    </div>);
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

        }
    }

    calculateScore =(x)=>
    {
        const { Size, Elements } = this.state;
        return 10*Elements*x+200*Elements*Math.round(x/(Size[0]*Size[1]));
    }

    componentDidMount(){
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

    //стартовоя доска
    startGenerateBoard = () =>{
        const board = generateBoard(this.props.row,this.props.line,this.props.howElem);
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
                                Score: state.Score+this.calculateScore(lengthCombo)}));
            
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
    arrayToJsx = (arr,iRow,ComboArray,active) =>
    {
        arr=arr.map((cel,key)=>{    
                                    const position=iRow+'-'+key;
                                    const combo=ComboArray[iRow][key];
                                    return (
                                    <Cell value={cel} key={position} id={position}
                                        class={ !cel ? 'hidden ': ((combo===active)? 'activeCel ':'')}
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

        const {Score, ListCombo}=this.state;
        const ComboCount=(Object.keys(ListCombo).length);
        let Board = JSON.parse(JSON.stringify(this.state.BoardElements));

        const ComboArray=this.state.ActiveElements;

        const active = this.state.ActiveCombo;

        for(let i=0;i<Board.length;i++){
            Board[i]=this.arrayToJsx(Board[i],i,ComboArray,active);
        }
        
        return (<div id="b">
                <div className='buttons' onClick={()=>this.pageChange(0)}>Go home</div>
                <div className='buttons' onClick={()=>this.componentDidMount()}>new game</div>
                <TopMenu 
                    Score={Score}
                    ComboCount={ComboCount}
                />
                {Board}
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
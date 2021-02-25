'use strict';


//выдача случайного числа
const randomNumber = (max) => 
{
    return Math.floor(1+Math.random()*(max));
}

//генерация поля со случайнми элементами
const generateBoard=(row,col,elem)=>{
    row=(row>5)? row : 6;
    col=(col>5)? col : 6;
    elem=(elem>3)? elem : 4;
    let boardEl=new Array(row);

    for(let i=0;i<row;i++)
    {
        boardEl[i]=new Array(col);
        for(let j=0; j<col;j++)
        {
            boardEl[i][j]=randomNumber(elem);
        }
    }
    return boardEl;
}


//крушение элемента
const crushElements = (x,y,board) =>{

    console.log(board);
    for(let i=x;i>0;i--)
    {
        board[i][y]=board[i-1][y];
    }
    board[0][y]=randomNumber(4);
    console.log('crushElements');
    console.log(board);
    return board;

    /*board[xy[0]][xy[1]]=0;
    return board;*/
}


//поиск "близких" однотипных элементов ("комбинация")
const viewSpace=(x,y,board,remove=false) =>{

    let crushedElements=[x+'-'+y], whatLook=board[x][y];
    searchAll(crushedElements,whatLook,board,0);
    if(remove)
    {
        const position=crushedElements.map(a=>a.split('-').map(b=>(+b)));
        for(let i=0;i<position.length;i++)
        {
            board[position[i][0]][position[i][1]]=-1;
        }
    }
    return crushedElements;
}

//проверка направлений элемента
const searchAll=(crushedElements,whatLook,board,position)=>{
   
    const [x,y]= (crushedElements[position].split('-'));
    
    if(x>0 && board[+x-1][y]==whatLook  && !crushedElements.includes((+x-1)+'-'+y)) {
        crushedElements.push((+x-1)+'-'+y);
    }

    if(y>0 && board[x][+y-1]==whatLook  && !crushedElements.includes(x+'-'+(+y-1))) {
        crushedElements.push(x+'-'+(+y-1));
    }

    if((+x+1 in board) && board[+x+1][y]==whatLook  && !crushedElements.includes((+x+1)+'-'+y)) {
        crushedElements.push((+x+1)+'-'+y);
    }

    if((+y+1 in board[x]) && board[x][+y+1]==whatLook  && !crushedElements.includes(x+'-'+(+y+1))) {
        crushedElements.push(x+'-'+(+y+1));
    }

    if(crushedElements.length>(+position+1)) {
        searchAll(crushedElements,whatLook,board,position+1);
    } 
}

//поиск всех "комбинацций"
const findAllCombo = (board) =>{

    const boardSearch=JSON.parse(JSON.stringify(board));
    console.log(boardSearch);
    let listCombo=[];
    console.log(boardSearch);
    for(let i=0;i<boardSearch.length;i++)
    {
        for(let j=0;j<boardSearch[i].length;j++)
        {
            
            if(boardSearch[i][j]>=0)
            {
                listCombo.push(viewSpace(i,j,boardSearch,true));
            }
        }
    }
    console.log('ttt '+board);
    return listCombo;
}

//блок
function Cell(params) {
    return (
    <div className={params.active+'boardCel'}
        onClick={params.click}
        onMouseOver ={params.mouseOver}
        onMouseOut ={params.mouseOut }>
        {params.value}
    </div>);
}

//"доска" с блоками
class GmaeBoard extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            BoardElements: [],
            ActiveElements: [],
            ListCombo: []
        }
    }

    componentDidMount(){

        this.setState({BoardElements: generateBoard(this.props.row,this.props.line,this.props.howElem)});
        //получение всех "комбинаций" дял текущей "доски"
        this.setState((state)=> ({ ListCombo: JSON.parse(JSON.stringify(state.BoardElements))}),
            ()=>console.log(findAllCombo(JSON.parse(JSON.stringify(this.state.ListCombo)))));
        
    }

    //процесс крушения
    processingCrush = (x,y) =>
    {
        let boardUpdate=JSON.parse(JSON.stringify(this.state.BoardElements));
        viewSpace(x,y,boardUpdate); 
        crushElements(x,y,boardUpdate,this.props.row,this.props.line);
        this.setState({BoardElements: boardUpdate});
    }

    //подсвечивание комбинации для выбранного элемента
    selectCombo = (x,y) =>{
        let boardUpdate=JSON.parse(JSON.stringify(this.state.BoardElements));
        const activeEl=viewSpace(x,y,boardUpdate);
        console.log(activeEl);
       this.setState({ActiveElements: activeEl});
    }

    //снятие подсвечивания комбинации
    outSelect = () =>{
        this.setState({ActiveElements: []});
    }

    //преобразование массива в блоки
    arrayToJsx = (arr,iRow) =>
    {
        arr=arr.map((cel,key)=>{    
                                    const position=iRow+'-'+key;
                                    return (
                                    <Cell value={cel} key={position} id={position}
                                        active={this.state.ActiveElements.includes(position)? 'activeCel ':''}
                                        click={()=>this.processingCrush(iRow,key)}
                                        mouseOver={()=>this.selectCombo(iRow,key)}
                                        mouseOut={()=>this.outSelect()}
                                    />
                                    )
                                });
        return <div key={iRow} className='boarRow'>{arr}</div>;
    }

    render(){
        let Board = JSON.parse(JSON.stringify(this.state.BoardElements));
        for(let i=0;i<Board.length;i++){
            Board[i]=this.arrayToJsx(Board[i],i);
        }
        
        return <div id="b">{Board}</div>;
    }


} 

class App extends React.Component {
    render(){
        return <GmaeBoard key='board' row={7} line={7} howElem={4}/>;
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
'use strict';

//функции
{
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
    const crushElements = (boardUpdate,combo) =>{

        console.log(combo.sort());
        const coordinates=combo.sort().map((xy)=>(xy.split('-')).map(a=>+a));
        let columnsDie=[];
        let removeStylesList=[];
        console.log(columnsDie);
        for(let i=0;i<coordinates.length;i++)
        {
            const x=coordinates[i][0],y=coordinates[i][1];

            //избавляемся от элемента
            boardUpdate[x][y]=false;
            document.getElementById(combo[i]).style.visibility='hidden';
            removeStylesList.push(combo[i]);
            columnsDie[y] = (y in columnsDie) ? (columnsDie[y]>x? columnsDie[y]: x) : x;
        }
        moveElementsDown(boardUpdate,columnsDie,removeStylesList);
        moveElementsLeft(boardUpdate,removeStylesList);
    return removeStylesList;
    }

    //поиск "сдвигающихся" влево элементов
    const moveElementsLeft=(boardUpdate,removeStylesList)=>{
        const lengthX=boardUpdate.length-1, lengthY=boardUpdate[0].length;
        
        for(let y=0;y<lengthY;y++)
        {
        /* let jump=1;*/
            console.log('boardUpdate[lengthX][y]');
            console.log(boardUpdate[lengthX][y]);
            if(!boardUpdate[lengthX][y])
            {
                const jump=ifElementOnRightExist(boardUpdate,y,lengthX,1,lengthY);
                if(jump)
                {
                    for(let x=lengthX;x>=0;x--)
                    {
                        if(boardUpdate[x][y]) break;
                        else {
                            const giver=y+jump;
                            
                            boardUpdate[x][y]=boardUpdate[x][giver];
                            boardUpdate[x][giver]=false;

                            const idElement=x+'-'+giver;
                            let elem=document.getElementById(idElement);
                            elem.style.right;
                            elem.style.right;
                            removeStylesList.push(idElement);
                        }
                    }
                }
            }
        }
        console.log('rightJump');
        console.log(boardUpdate);

    }
    //поиск "сдвигающихся" вниз элементов
    const ifElementOnRightExist = (boardUpdate,j,i,jump,lengthY) =>
    {
        let thisJ=j+jump;
        if((thisJ<lengthY)){
            if(boardUpdate[i][thisJ]){
                console.log(jump);
                return jump;
            }
            else
            {
                return ifElementOnRightExist(boardUpdate,j,i,(jump+1),lengthY);
            }  
        }
        else{
            return false;
        }
    }

    //поиск "падающих" элементов
    const ifElementOnTopExist = (boardUpdate,i,j,jump) =>
    {
        let thisI=i-jump;
        if((thisI>=0)){
            
            if(boardUpdate[thisI][j]){
                console.log(jump);
                return jump;
            }
            else
            {
                return ifElementOnTopExist(boardUpdate,i,j,(jump+1));
            }  
        }
        else{
            return false;
        }
    }

    const moveElementsDown = (boardUpdate,columnsDie,removeStylesList) =>{
        const length=boardUpdate[0].length;
        for(let y=0;y<length;y++)
        {
            if(columnsDie[y]!==undefined)
            {
                let jump=1;
                for(let x=columnsDie[y];x>0;x--)
                {

                    jump=ifElementOnTopExist(boardUpdate,x,y,jump);
                    if(jump)
                    {
                        const giver=x-jump;
                        boardUpdate[x][y]=boardUpdate[giver][y];
                        boardUpdate[giver][y]=false;

                        const idElement=giver+'-'+y;
                        let elem=document.getElementById(idElement);
                        elem.style.top= 0+'px';
                        elem.style.top= (jump*30)+'px';
                        removeStylesList.push(idElement);
                    }
                    else break;

                }
            }
        }
    }


    const clearAnimation=(removeStyleList)=>{
        for(let i=0;i<removeStyleList.length;i++){
            document.getElementById(removeStyleList[i]).removeAttribute("style");}
    }

    //поиск "близких" однотипных элементов ("комбинация")
    const viewSpace=(x,y,board,remove=false) =>{

        let crushedElements=[x+'-'+y], whatLook=board[x][y];
        searchAll(crushedElements,whatLook,board,0);
        if(remove)
        {
            const position=crushedElements.map(a=>a.split('-').map(b=>(+b)));
            if(crushedElements.length>1)
            {
                for(let i=0;i<position.length;i++)
                {
                    board[position[i][0]][position[i][1]]=remove;
                }
            }
            else
            {
                board[position[0][0]][position[0][1]]=false;
                return false;
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
    //ListCombo: [0],
    //ActiveElements: [1],
    const findAllCombo = (board) =>{

        const boardSearch=board;
        let listCombo=[], howManyCombos=0;
        for(let i=0;i<boardSearch.length;i++)
        {
            for(let j=0;j<boardSearch[i].length;j++)
            {
                
                if(Number.isInteger(boardSearch[i][j]))
                {
                    howManyCombos++;
                    const combos = viewSpace(i,j,boardSearch,('c'+howManyCombos))
                    if(combos) listCombo['c'+howManyCombos]=combos;
                }
            }
        }
        console.log(boardSearch);
        return [listCombo, boardSearch];
    }
}



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
class GmaeBoard extends React.Component{

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

        this.setState({
            BoardElements: structure[0],
            ListCombo: structure[1][0],
            ActiveElements: structure[1][1],
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

        document.getElementById('root').classList.add('disactive');

        let boardUpdate=JSON.parse(JSON.stringify(this.state.BoardElements));

        const combo=this.state.ListCombo[comboIndex];
        const lengthCombo=combo.length;
        console.log("lengthCombo");
        console.log(lengthCombo);
        const removeStyleList=crushElements(boardUpdate,combo);

        const boardCombo = findAllCombo(JSON.parse(JSON.stringify(boardUpdate)));

        let timer=setTimeout(()=>{
                    clearAnimation(removeStyleList);
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
        return <div key={iRow} className='boarRow'>{arr}</div>;
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
    <div id='TopMenu'>
       <div>Score: {props.Score} </div>
       <div>Возможные ходы: {props.ComboCount} </div>
    </div>);
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
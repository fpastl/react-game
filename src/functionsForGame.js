
//выдача случайного числа
export const randomNumber = (max) => 
{
    return Math.floor(1+Math.random()*(max));
}


//генерация поля со случайнми элементами
export const generateBoard=(row,col,elem)=>{
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
export const crushElements = (boardUpdate,combo) =>{

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
    let left=moveElementsLeft(boardUpdate,removeStylesList);
    return [removeStylesList,left];
}

//поиск "сдвигающихся" влево элементов
const moveElementsLeft=(boardUpdate,removeStylesList)=>{
    const lengthX=boardUpdate.length-1, lengthY=boardUpdate[0].length;
    let left=false;
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
                        left=true;
                    }
                }
            }
        }
    }
    console.log('rightJump');
    console.log(boardUpdate);
    return left;
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
                    elem.style.top= (jump*18)+'px';
                    removeStylesList.push(idElement);
                }
                else break;

            }
        }
    }
}


export const clearAnimation=(removeStyleList)=>{
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
export const findAllCombo = (board) =>{

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

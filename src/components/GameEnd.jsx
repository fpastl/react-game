import React from 'react';

export default function GameEnd(props) {
    
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
        const ScoreListName='ScoreList'+Size[0]+'x'+Size[1];

        let ScoreList=JSON.parse(localStorage.getItem(ScoreListName));

        if(ScoreList)
        {
            ScoreList.push([name, Score]);
            ScoreList.sort(
                (a,b)=>{+a[1]>(+b[1])? -1 : 1;}
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
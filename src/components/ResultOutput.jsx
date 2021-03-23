import React from 'react';
import ResultRow from './ResultRow';


export default function ResultOutput(props){
    const {Size}=props;
    const scoreList=JSON.parse(localStorage.getItem(('ScoreList'+Size[0]+'x'+Size[1])));
    let scoreBoard=[];
    if(scoreList!=null){
        const length=scoreList.length;
        for(let i=0;i<length;i++)
        {
            scoreBoard[i]=<ResultRow key={i} data={scoreList[i]} position={i+1} />
        }
        if(length<10){
            for(let i=length;i<10;i++)
            {
                scoreBoard[i]=<ResultRow key={i} data={['aaa','0000']} position={i+1} />
            }
        }
    }
    else{
        for(let i=0;i<10;i++)
            {
                scoreBoard[i]=<ResultRow key={i} data={['aaa','0000']} position={i+1} />
            } 
    }
    return (
            <table>
                <ResultRow data={['Name','Score']} position={'#'} />
                {scoreBoard}
            </table>
            );
}
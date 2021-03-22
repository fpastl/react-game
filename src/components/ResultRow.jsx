import React from 'react';

export default function ResultRow(props){
    const {data,position}=props;
    return (
        <tr><td>{position}</td><td>{data[0]}</td><td>{data[1]}</td></tr>
    )
}
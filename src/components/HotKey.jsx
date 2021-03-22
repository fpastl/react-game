import React from 'react';

export default function HotKey(props){
    const {MenuItem,Key}=props;
    return(
        <div className='Row HK'><span className='MenuItem'>{MenuItem+':'}</span><span className='key'>{Key}</span></div>
    );
}
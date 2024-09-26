import React from 'react';
import "./Loading.css";

const Loading = () => {
    return (
        <div className='mt-60'>
            <h1 className='text-4xl lg:text-4xl text-center font-serif italic font-extrabold px-8'>dora's getting to know you!</h1>
            <div className="loader-container">
                <div className="loader2 text-center"></div>
                
            </div>

            <p className='text-center'>please wait, this can take some time...</p>
        </div>
    )
}

export default Loading

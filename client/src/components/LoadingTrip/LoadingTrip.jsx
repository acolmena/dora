import React from 'react';
import "./LoadingTrip.css";
const LoadingTrip = (props) => {
    return (
        <div className='mt-20'>
            <h1 className='text-2xl lg:text-4xl text-center font-serif italic font-extrabold px-8'>dora's planning your trip to {props.city}...</h1>
            <div className='loading-container'>
                <div className="loader-wrapper">
                    <div className="loader2"></div>
                </div>
            </div>
            <p className='text-center'>please wait, this can take some time...</p>
        </div>
    );
}
export default LoadingTrip;
import React, {useEffect} from 'react';
import "./Header.css";

const Header = () => {
    const smoothScroll = () => {
        const howItWorksSection = document.getElementById('how-it-works');
        howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div className='mt-60'>
                <div className='cta'>
                    <h1 className=' font-serif mb-4 text-7xl lg:text-9xl text-center font-extrabold leading-none tracking-tight text-white  dark:text-white italic'>dora.</h1>
                    <h2 className='text-center text-1xl'>your TikTok personality in an itinerary </h2>
                    <h2 className='font-serif text-center text-1xl'>#foryou </h2>
                    <div className='start-button text-center mt-5'>
                        <a type='button' className='cursor-pointer bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 shadow rounded-full' onClick={smoothScroll}>
                            let's explore!
                        </a>
                    </div>
                </div>
            </div>
            <div id='img' className='sm:px-20'></div>
        </div>
    );
}

export default Header

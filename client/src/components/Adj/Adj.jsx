import React from 'react';
// import "./Adj.css";

const Adj = (props) => {
    const smoothScroll = () => {
        const citySection = document.getElementById('city');
        citySection.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section id='adjSection' className='mt-80 mb-80 px-8 flex flex-col justify-center items-center'>  
            {/* <div className='logo'>Voyage</div> */}
            <div>
                <p className='text-4xl font-extrabold text-white text-center'>Based on your TikTok, you are...</p>
                <p className='text-4xl italic font-serif text-center font-bold text-orange-500 mt-6'>{props.adjs[0]}</p>
                <p className='text-4xl italic font-serif text-center font-bold text-blue-300 mt-2'>{props.adjs[1]}</p>
                <p className='text-4xl italic font-serif text-center font-bold text-pink-500 mt-2'>{props.adjs[2]}</p>
            </div>
            <br />
            <div className='continue-button flex justify-center mt-2'>
                <a type='button' className='cursor-pointer text-black font-bold bg-white focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm px-5 py-2.5 me-2 mb-2 shadow white-bg' onClick={smoothScroll}>
                    continue
                </a>
            </div>
        </section>

    )
}

export default Adj

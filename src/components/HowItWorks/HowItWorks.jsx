import React from 'react';
import "./HowItWorks.css";

const HowItWorks = () => {
    const smoothScroll = () => {
        const howItWorksSection = document.getElementById('username');
        howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div id='how-it-works' className="flex flex-col items-center justify-center h-screen">
            <div className="w-80 lg:p-8 p-6 bg-black border border-white shadow-md rounded-lg text-white">
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-3xl lg:text-5xl text-center font-serif italic font-extrabold mb-4'>how it works</h1>
                    <p className="bg-orange-400 font-serif text-gray-800 font-bold rounded-full p-2 h-8 w-8 flex items-center justify-center border border-black">1</p>
                    <p className='text-base font-extrabold mt-4'>show us your taste :3</p>
                    <p className='text-base text-center'>temporarily make your Tiktok account and liked posts public</p>
                    <div className='p-4'>
                        <p className='text-base p-2 border border-gray-500 rounded-lg'>Settings &gt; Privacy &gt; Private Account (off) &gt; Liked Videos (everyone)</p>
                    </div>
                    <p className="bg-blue-400 font-serif text-gray-800 font-bold rounded-full p-2 h-8 w-8 flex items-center justify-center border border-black">2</p>
                    <p className='text-base font-extrabold mt-2'>privacy on your own terms</p>
                    <p className='text-base text-center'>switch back to private once you've got your results.</p>
                </div>
                
            </div>
            <button className='text-black font-bold lg:px-5 lg:py-3 bg-white focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm px-5 py-2.5 mt-6 shadow' onClick={smoothScroll}>continue exploring!</button>
        </div>

    )
}

export default HowItWorks
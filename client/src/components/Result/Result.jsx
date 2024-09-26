import React, {useState, useEffect} from 'react';
import ErrorUsername from '../ErrorUsername/ErrorUsername';
import "./Result.css";

const Result = (props) => {
    const [err, setErr] = useState({errorEvent: false, errorMessage: ''});

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        // return () => {
        //     document.body.removeChild(script);
        // };
    }, []);

    const handleShare = () => {
        if (navigator.share) {
        navigator.share({
            text: 'traveling soon? I just used Dora. It\'s so cool! Check it out: https://travelwithdora.com',
            // url: 'https://travelwithdora.netlify.app/'
        })
            // .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Error sharing:', error));
        } else {
        // Fallback for browsers that do not support Web Share API
        alert('Sharing is not supported on this browser.');
        }
    };

    const displayErr = () => {
        setErr({errorEvent: true, errorMessage: 'We\'re experiencing higher than usual traffic. Try refreshing the page and starting again. Reach out to us at travelwdora@gmail.com if this problem persists.'});
    }

    return (
        <div className='p-8 mt-80'>
            {err.errorEvent && <ErrorUsername errorMessage={err.errorMessage}/>}
            <div className="flex flex-col items-center justify-center">
                <h1 className='mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white'>your personalized itinerary</h1>
                <p className='text-3xl text-white italic text-center font-serif mt-4 mb-5'>love, dora.</p>
                <div className="flex flex-wrap justify-center sm:justify-between mb-6">
                    <div className="w-80 p-6 m-4 bg-white shadow-md rounded-lg">
                        <h1 className='text-2xl font-bold text-center font-serif text-black mb-3'>{props.locations[0]}</h1>
                        <div>
                            <p className='text-2xl font-normal italic text-center font-serif text-black' >{props.results[0] ? props.results[0] : displayErr()}</p>
                        </div>
                        <br />
                        <a type='button' target="_blank" href={props.urls[0] ? props.urls[0] : displayErr()} className='cursor-pointer text-black font-bold bg-pink-200 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm px-5 py-2.5 me-2 mb-2 shadow white-bg'>
                            See it on TikTok
                        </a>
                        <div dangerouslySetInnerHTML={{ __html: props.embedCode }} />
                    </div>
                    <div className="w-80 p-6 m-4 bg-white shadow-md rounded-lg">
                        <h1 className='text-2xl font-bold text-center font-serif text-black mb-3'>{props.locations[1]}</h1>
                        <div>
                            <p className='text-2xl font-normal italic text-center font-serif text-black' >{props.results[1] ? props.results[1] : displayErr()}</p>
                        </div>
                        <br />
                        <a type='button' target="_blank" href={props.urls[1] ? props.urls[1] : displayErr()} className='cursor-pointer text-black font-bold bg-pink-200 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm px-5 py-2.5 me-2 mb-2 shadow white-bg'>
                            See it on TikTok
                        </a>
                    </div>
                    <div className="w-80 p-6 m-4 bg-white shadow-md rounded-lg">
                        <h1 className='text-2xl font-bold text-center font-serif text-black mb-3'>{props.locations[2]}</h1>
                        <div>
                            <p className='text-2xl font-normal italic text-center font-serif text-black' >{props.results[2] ? props.results[2] : displayErr()}</p>
                        </div>
                        <br />
                        <a type='button' target="_blank" href={props.urls[2] ? props.urls[2] : displayErr()} className='cursor-pointer text-black font-bold bg-pink-200 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm px-5 py-2.5 me-2 mb-2 shadow white-bg'>
                            See it on TikTok
                        </a>
                    </div>
                </div>
            </div>
            <span className='font-serif italic mt-6'>Before you depart, be sure to share with your friends!     </span>
            <button className='cursor-pointer bg-blue-300 hover:bg-blue-400 hover:border-blue-400 text-gray-800 font-semibold py-2 px-4 border border-blue-300 shadow rounded-full ml-6' onClick={handleShare}>
                <span className="flex items-center">
                    share
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-6 my-1 text-black ml-1">
                        <path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z">
                        </path>
                    </svg>
                </span>
            </button>

          <br />
          <br />
          <span className='text-gray-200 font-normal italic font-serif'>Feedback? Questions? Reach out to us at <a className='underline' href="mailto:travelwdora@gmail.com">travelwdora@gmail.com</a>.</span>
        </div>

    )
}

export default Result
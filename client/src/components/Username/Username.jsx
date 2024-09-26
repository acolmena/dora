import React, { useState, useEffect } from 'react';
import "./Username.css";
import ErrorUsername from '../ErrorUsername/ErrorUsername';
import Loading from '../Loading/Loading';
import axios from 'axios';
//import { OpenAI } from "/Users/irawadee.t/anaconda3/lib/python3.11/site-packages/transformers/models/openai";

// Import your assets as needed

// for server
const API_BASE_URL = 'https://doraserver-d252d86568b7.herokuapp.com/api' //https://api.tikapi.io'; 
const OPENAI__BASE_URL = 'https://doraserver-d252d86568b7.herokuapp.com/page1' //https://api.tikapi.io'; 

const Username = ({ onData }) => {
    // const [buttonClicked, setButtonClicked] = useState(false);
    const [form, setForm] = useState({ username: '' });
    const [err, setErr] = useState({ errorEvent: false, errorMessage: '' });
    const [showLoading, setLoading] = useState(false);
    // const [sortedHashtags, setSortedHashtags] = useState([]);
    // const [adjectives, setAdjectives] = useState(['cool', 'funny', 'fun']);
    // const [showAdjectives, setShowAdjectives] = useState(false);
    // const [results, setResults] = useState([]);
    // const [showResults, setShowResults] = useState(false);

    const fetchData = async () => {
        const apiKey = import.meta.env.VITE_TIKAPI_TOKEN; // Using environment variable for API key
        let username = form.username.toLowerCase().trim(); // Use the username from form state & ignore "@"
        if (username[0] == "@") {
            username = username.substring(1);
        }
        // console.log(username);        
        try {
            const feedResponse = await axios.get(API_BASE_URL, {
                params: {
                    username: username, // Replace 'lilyachty' with the username you want to check
                    // purpose: 'checkUser'
                }
            });
            if (feedResponse.status == 500) {
                throw new Error('Failed to fetch data');
            }
            // console.log(feedResponse)

            const likedList = feedResponse.data.itemList;
            // console.log(likedList);
            let sortedHashtags;

            if (likedList && Array.isArray(likedList)) {
                const hashtagCounts = new Map();

                likedList.forEach(video => {
                    if (Array.isArray(video.textExtra)) {
                        video.textExtra?.forEach(tag => {
                            if (tag.type === 1 && tag.hashtagName.toLowerCase() !== 'fyp') {
                                const hashtagLower = tag.hashtagName.toLowerCase();
                                hashtagCounts.set(hashtagLower, (hashtagCounts.get(hashtagLower) || 0) + 1);
                            }
                        });
                    }
                });

                sortedHashtags = Array.from(hashtagCounts)
                    .sort(([, countA], [, countB]) => countB - countA)
                    .slice(0, 10)
                    .map(([hashtag]) => hashtag);

                // setSortedHashtags(sortedHashtags);
            } else {
                throw new Error("No videos or textExtra found.");
            }

            // console.log(sortedHashtags);

            let inputString = "Based on the following hashtags: " + sortedHashtags.join(', ') + ", describe me in 3 adjectives, make sure all words can be used to describe a person. Output the words only separated by commas"; //describe me as a person in 3 adjectives. Output the words only separated by commas";

            const response = await axios.post(OPENAI__BASE_URL,
                {
                    message: inputString
                });

            setLoading(false);  // get rid of loading
            // setAdjectives(data.message.toLowerCase().split(",")); 
            // setShowAdjectives(true);  // trigger adjectives component to render

            onData({ adjs: response.data.message.toLowerCase().split(","), showAdjs: true, user: form.username, sortedHashes: sortedHashtags });
        } catch (error) {
            setErr({ errorEvent: true, errorMessage: 'Check that you (1) typed your username correctly and (2) set your likes to public. Try refreshing the page and starting again. Reach out to us at travelwdora@gmail.com if this problem persists.' });
            setLoading(false);  // get rid of loading
            errorHandling(error);
        }

    };

    // set and scroll to error if it occurs
    const errorHandling = (error) => {
        console.log(error);
        // remove all components below username
        // setShowAdjectives(false); 
        const errorSection = document.getElementById('errorUsername');
        errorSection.scrollIntoView({ behavior: 'smooth' });
    }

    const doSubmit = async (e) => {
        e.preventDefault();
        // setButtonClicked(true);
        setLoading(true);
        const loadingComp = document.querySelector('#loading');
        loadingComp.scrollIntoView({ behavior: 'smooth' });

        // remove error component if previous click resulted in a 
        setErr({ errorEvent: false });
        await fetchData();

    };

    const doInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleNoTikTok = () => {
        onData({ adjs: 'no tiktok', showAdjs: false, user: 'no tiktok', sortedHashes: [] });
    };

    return (
        <section className="flex items-center justify-center h-screen flex-col">
            <div id='username'>
                <h1 className="text-4xl font-bold text-center text-white mb-8 mt-80">What's your TikTok username?</h1>
                <form onSubmit={doSubmit} className="flex flex-col items-center px-10">
                    <input
                        className="bg-white border border-gray-300 text-center font-serif italic text-gray-500 lg:text-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full"
                        type="text"
                        placeholder="@username"
                        name="username"
                        value={form.username}
                        onChange={doInputChange}
                        required
                    />
                    <button className="text-black font-bold bg-white rounded-full text-sm px-5 py-2.5 me-2 mb-2 mt-5 shadow white-bg" type="submit">discover you</button>
                </form>
                <div className="flex flex-col items-center px-10">
                    <button onClick={handleNoTikTok} className="text-black font-bold bg-orange-200 hover:bg-orange-300 rounded-full text-sm px-5 py-2.5 me-2 mb-2 mt-2 shadow white-bg" >no TikTok? introduce yourself to dora!</button>
                </div>
            </div>
            {/* <Loading /> */}
            <div id='loading'>
                {showLoading && <Loading />}
            </div>
            {/* <ErrorUsername/> */}
            {err.errorEvent && <ErrorUsername errorMessage={err.errorMessage} />}

        </section>

    );
};

export default Username;
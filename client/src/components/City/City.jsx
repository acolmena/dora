import React, { useState, useEffect } from 'react';
import "./City.css";
import Result from '../Result/Result';
import LoadingTrip from '../LoadingTrip/LoadingTrip';
import ErrorUsername from '../ErrorUsername/ErrorUsername';
import { supabase } from '../../supabaseClient';
import axios from 'axios';

const API_BASE_URL = 'https://doraserver-d252d86568b7.herokuapp.com/search';
const OPENAI__BASE_URL = 'https://doraserver-d252d86568b7.herokuapp.com/page1' //https://api.tikapi.io'; 
// const TIKTOK_BASE_URL = 'https://doraserver-d252d86568b7.herokuapp.com/tiktok_embed';


// const City = ({onCityData}) => {
const City = (props) => {
    const [form, setForm] = useState({ city: '' });
    const [err, setErr] = useState({errorEvent: false, errorMessage: ''});
    const [buttonText, setButtonText] = useState('');
    const [results, setResults] = useState({results: [], locations:[]});
    const [showResults, setShowResults] = useState(false);
    const [urls, setURLs] = useState(['default1', 'default2', 'default3']);
    const [showLoading, setLoading] = useState(false);
    // const [enteredData, setEnteredData] = useState(false);


    const fetchData = async () => {
        let city = form.city;
        let complete_prompt2;
        let loc1;
        let loc2;
        let loc3;
        let url1;
        let url2;
        let url3;
        let finalResults;

        let describers = typeof props.adjs == 'object' ? props.adjs.join() : props.adjs;
        let default_prompt2 = "These 3 adjectives describe me:" + describers;
        let userInputCity = city;
        complete_prompt2 = default_prompt2 + ". Could you give me 3 activities I could do in " + userInputCity + ", in the tone of travel blog writer? Each activity should be at a different place within " + userInputCity + ". The output should be an array of size 3. Each of the 3 elements is an array of size 2: first element is a string containing the blogger style result, and the second element should contain the name of the location mentioned in the corresponding activity.";
        // complete_prompt2 = default_prompt2 + ". Could you give me 3 activities I could do in" + userInputCity + ", in the tone of travel blog writer? Each activity should be at a different location. Separate each description by a tilde.";
        try {
            const response = await axios.post(OPENAI__BASE_URL, 
                {
                     message: complete_prompt2
                });
        
            // if (!response.ok) {
            //     throw new Error('Failed to fetch data');
            // }
        
            const data = response.data
            // console.log(data.message);
            // let resultsArray = data.message.split("~");
            let data_str = typeof data.message === 'string' ? data.message.replace(/^\[/, '').replace(/\]$/, '') : data.message;
            let data_arr = data_str.split(',');
            let activities = "";
            for (let i = 0; i < data_arr.length; i++) {
                activities += data_arr[i].trim() + " ";
            }
            const activitiesArray = activities.match(/\[(.*?)\]/g).map(activity => activity.slice(1, -1));
            const resultsArray = activitiesArray.map(activity => {
                const blogContent = activity.match(/"(.*?)"/)[1];
                const locContent = activity.match(/"(.*?)"/g)[1].slice(1, -1);
                return { blogContent, locContent };
            });
        
            finalResults = [resultsArray[0]['blogContent'], resultsArray[1]['blogContent'], resultsArray[2]['blogContent']];
            
            loc1 = resultsArray[0]['locContent'] + " " + city + " travel"; // add city and travel in query to make more specific 
            loc2 = resultsArray[1]['locContent'] + " " + city + " travel";
            loc3 = resultsArray[2]['locContent'] + " " + city + " travel";
            setResults({results: finalResults, locations: [resultsArray[0]['locContent'], resultsArray[1]['locContent'], resultsArray[2]['locContent']]});
            

            const searchResponse1 = await axios.get(API_BASE_URL, {
                params: {
                    loc: loc1, // Replace 'lilyachty' with the username you want to check
                    // purpose: 'checkUser'
                }
            });
            if (searchResponse1.status == 500) {
                throw new Error('Failed to fetch data');
            }
            // console.log(searchResponse1)
        
            // if (!searchResponse1.ok) {
            //     throw new Error('Failed to fetch data');
            // }
    
            // process searchData1
            // check username
            const searchData1 = searchResponse1.data;
            if (!searchData1['item_list']['0']['author']['uniqueId']) {
                throw new Error("No valid video data.");
            }
            // check videoID
            if (!searchData1['item_list']['0']['video']['id']) {
                throw new Error("video ID not found for the specified user.");
            }
            let username = searchData1['item_list']['0']['author']['uniqueId'];
            let videoID = searchData1['item_list']['0']['video']['id'];
            // console.log(username);
            // console.log(videoID);
            url1 = 'https://www.tiktok.com/@' + username + '/video/' + videoID;
            // console.log(url1);
            // setURL1(url_1);

            const searchResponse2 = await axios.get(API_BASE_URL, {
                params: {
                    loc: loc2, // Replace 'lilyachty' with the username you want to check
                    // purpose: 'checkUser'
                }
            });
            if (searchResponse2.status == 500) {
                throw new Error('Failed to fetch data');
            }

            const searchData2 = searchResponse2.data;
            // console.log(searchData2);
            // process searchData2
            let username2 = searchData2['item_list']['0']['author']['uniqueId'];
            let videoID2 = searchData2['item_list']['0']['video']['id'];
            // console.log(username2);
            // console.log(videoID2);
            url2 = 'https://www.tiktok.com/@' + username2 + '/video/' + videoID2;
            // console.log(url2);
            // setURL2(url_2);
        
            // if (!searchResponse3.ok) {
            //     throw new Error('Failed to fetch data');
            // }
        
            // const searchData3 = await searchResponse3.json();
            // console.log(searchData3);

            const searchResponse3 = await axios.get(API_BASE_URL, {
                params: {
                    loc: loc3, // Replace 'lilyachty' with the username you want to check
                    // purpose: 'checkUser'
                }
            });
            if (searchResponse3.status == 500) {
                throw new Error('Failed to fetch data');
            }
            // console.log(searchResponse3)
        
            // if (!searchResponse2.ok) {
            //     throw new Error('Failed to fetch data');
            // }
        
            // const searchData2 = await searchResponse2.json();
            const searchData3 = searchResponse3.data;
            // console.log(searchData3);
            // process searchData3
            let username3 = searchData3['item_list']['0']['author']['uniqueId'];
            let videoID3 = searchData3['item_list']['0']['video']['id'];
            // console.log(username3);
            // console.log(videoID3);
            url3 = 'https://www.tiktok.com/@' + username3 + '/video/' + videoID3;
            // console.log(url3);
            setURLs([url1, url2, url3]);     

            
        
        } catch (error) {
            setLoading(false); // get rid of loading
            if (showResults) setShowResults(false);
            setErr({errorEvent: true, errorMessage: 'We\'re experiencing higher than usual traffic. Try refreshing the page and starting again. Reach out to us at travelwdora@gmail.com if this problem persists.'});
        }
        
        
        // Fetch user details
        // get response 1
    };
    useEffect(() => {
        // console.log(props.username, form.city, props.adjs, props.hashtags, results, urls);
        if (form.city && props.adjs && results.results.length != 0 && urls[0] != 'default1') {
            // console.log("saving")
            const storeUserData  = async () => {    
                // Once all promises are resolved, insert the data into the Supabase database
                try {
                    // const { data: userData, error } = await supabase
                    await supabase
                        .from('users')
                        .insert([{
                            tiktok_username: props.username,
                            city: form.city,
                            adjectives: typeof props.adjs == 'object' ? props.adjs : props.adjs.split(","),
                            tiktok_hashtags: props.hashtags,
                            itinerary: results.results,
                            tiktok_video_urls: urls
                        }]);
            
                    // if (error) {
                    //     console.error('Error storing user data:', error);
                    // } else {
                    //     console.log('User data stored:', userData);
                    // }
                    // setEnteredData(true);
                } catch (error) {

                    console.error('Error while waiting for data:', error);
                }
            };
            storeUserData();
        }
        
    }, [props.username, props.adjs, props.hashtags, results.results, urls]);

    // useEffect(() => {
    //     const fetchEmbedCode = async () => {
    //         try {
    //             const response = await fetch(`${TIKTOK_BASE_URL}/oembed?url=${encodeURIComponent(videoUrl)}`);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch embed code');
    //             }
    //             const data = await response.json();
    //             setEmbedCode(data.html);
    //         } catch (error) {
    //             console.error('Error fetching embed code:', error);
    //         }
    //     };

    //     fetchEmbedCode();
    // }, [urls]);

    const doSubmit = async (e) => {
        e.preventDefault();
        // setButtonClicked(true);
        setErr({errorEvent: false});
        setShowResults(false);
        setLoading(true);
        // smooth scroll to loading component
        const loadingComp = document.querySelector('#loadingTrip');
        loadingComp.scrollIntoView({ behavior: 'smooth' });
        // onCityData({city: form.city, submitted: true});

        await fetchData().then(() => {
            // conditionally render results component
            setShowResults(true);
            // smooth scroll to results section 
            const resultsSection = document.getElementById('results');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        setLoading(false); // get rid of loading
    };

    const doInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // For creating button text next to "Explore"
        // setInput(value);
        setButtonText(value);
    };

    return (
        <section id='city' className="mt-80 mb-80 px-8 flex flex-col justify-center items-center">
            <div className='section-wrap'>
                <h1 className='text-4xl font-extrabold text-center text-white mb-8'>Where is your next adventure?</h1>
                <div className='quest text-center'>
                    <div className="flex flex-col items-center">
                        <form onSubmit={doSubmit} className="flex flex-col items-center">
                            <input
                                className="bg-white border border-gray-300 text-center font-serif italic text-gray-500 lg:text-4xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:placeholder-lg dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full"
                                type="text"
                                placeholder="destination"
                                name="city"
                                value={form.city}
                                onChange={doInputChange}
                                required
                            />
                            <span className='text-gray-100 font-serif italic mt-4 mb-4'>i.e. Paris, Colombia, Southeast Asia </span>
                            <button type="submit" className="text-black font-bold bg-white focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm px-5 py-2.5 mb-2 shadow white-bg mt-4">
                                explore <span>{buttonText}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* <div id='loadingTrip'>
                 <LoadingTrip city={form.city}/>
            </div> */}
            {err.errorEvent && <ErrorUsername errorMessage={err.errorMessage}/>}
            <div id='loadingTrip'>
                {showLoading && <LoadingTrip city={form.city}/>}
            </div>
            <div id='results'>
                {showResults && <Result results={results.results} locations={results.locations} urls={urls} />}
            </div>
            {/* <Result results={results} urls={urls} embeddings={embedCode}/> */}
            {/* <div id='vidTest-container'></div> */}
        </section>
    );
};

export default City
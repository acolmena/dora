// a express server, which will handle api requests coming in and respond back with a json object, it will use body parser as well as cross

const OpenAI = require("openai");
const dotenv = require('dotenv');
const TikAPI = require('tikapi').default;
dotenv.config();

const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3003;

const api = TikAPI(process.env.VITE_TIK_API);
const openai = new OpenAI({
    organization: process.env.VITE_CHATTY_ORG,
    apiKey: process.env.VITE_CHATTY_KEY,
});

const frontEndDomain = "http://localhost:5173";


app.use(bodyParser.json());
app.use(cors(
//     {
//     origin: frontEndDomain,
//     credentials: true, // if you are using cookies or authorization headers
// }
));

app.get('/tiktok_embed', async (req, res) => {
    try {
        const response = await axios.get('https://www.tiktok.com' + req.url);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching TikTok Embed data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.get('/api', async (req, res) => {
//     try {
//         const response = await axios.get('https://api.tikapi.io' + req.url);
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error calling TikAPI:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
app.get('/api', async (req, res) => {
    try {
        const response = await axios.get(`https://api.tikapi.io/public/check?username=${req.query.username}`, {
            headers: {
                'X-API-KEY': process.env.VITE_TIK_API,
                'accept': 'application/json'
            }
        })
        // const response = await axios.get('https://api.tikapi.io' + req.url);
        // res.json(response.data);
        // console.log(req.query.username)
        // let response = await api.public.check({
        //     username: req.query.username
        // });

        // console.log(response.data)
        // console.log(response.data.userInfo)
        // console.log(response.data.userInfo.user)
        
        if (!response || !response.data || !response.data.userInfo || !response.data.userInfo.user) {
            throw new Error("No valid user data.");
        } else {
            secUid = response.data.userInfo.user.secUid;
        }
        if (!secUid) {
            throw new Error("secUid not found for the specified user.");
        }

        console.log("secUid response", secUid)

        // get last 30 liked videos
        const responseLikes = await axios.get(`https://api.tikapi.io/public/likes?secUid=${secUid}&count=30`, {
            headers: {
                'X-API-KEY': process.env.VITE_TIK_API,
                'accept': 'application/json'
            }
        })
        console.log(responseLikes)

        // send back the likes
        res.json(responseLikes.data);
    } catch (error) {
        console.error('Error calling TikAPI:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.get('/apilikes', async (req, res) => {
//     try {
//         const response= await axios.get(`https://api.tikapi.io/public/likes?secUid=${req.query.secUid}&count=30`, {
//             headers: {
//                 'X-API-KEY': process.env.VITE_TIK_API,
//                 'accept': 'application/json'
//             }
//         })
//         console.log(response)
        

//         res.json(response.data);
//     } catch (error) {
//         console.error('Error calling TikAPI:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

app.get('/search', async (req, res) => {
    try {
        const response = await axios.get(`https://api.tikapi.io/public/search/videos?query=${req.query.loc}`, {
            headers: {
                'X-API-KEY': process.env.VITE_TIK_API,
                'accept': 'application/json'
            },
        });

        console.log(response)

        res.json(response.data);
    } catch (error) {
        console.error('Error calling TikAPI:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/page1', async (req, res) => {
    // Validate request body
    // if (!req.body || !req.body.page || !req.body.message) {
    

    // Validate page field
    // if (req.body.page !== 'username') {
    //     return res.status(400).json({ error: 'Invalid page value' });
    // }

    try {
        if (!req.body || !req.body.message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { message } = req.body;
        const response = await openai.chat.completions.create({
            messages: [{ role: "system", content: message }],
            model: "gpt-3.5-turbo",
        });
        console.log(response.choices[0].message.content);
        // res.header("Access-Control-Allow-Origin", frontEndDomain);
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({message: response.choices[0].message.content});
        // send error back to 
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.post('/page2', async (req, res) => {
//     if (req.body.page === 'city') {
//         // Handle OpenAI API call for Page 2
//         const { message } = req.body;
//         const response = await openai.chat.completions.create({
//             messages: [{ role: "system", content: message }],
//             model: "gpt-3.5-turbo",
//         });
//         console.log(response.choices[0].message.content);
//         res.json({ message: response.choices[0].message.content });
//     }
// });

// app.post('/page3', async (req, res) => {
//     if (req.body.page === 'city') {
//         // Handle OpenAI API call for Page 2
//         const { message } = req.body;
//         const response = await openai.chat.completions.create({
//             messages: [{ role: "system", content: message }],
//             model: "gpt-3.5-turbo",
//         });
//         console.log(response.choices[0].message.content);
//         res.json({ message: response.choices[0].message.content });
//     }
// });

app.listen(port, () => {
    console.log('Example page listening');
});

// app.get('/tiktok_embed', async (req, res) => {
//     try {
//         const response = await axios.get('https://www.tiktok.com' + req.url);
//         res.send(response.data);
//     } catch (error) {
//         console.error('Error fetching TikTok Embed data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/api', async (req, res) => {
//     try {
//         const response = await axios.get(`https://api.tikapi.io/public/check?username=${req.query.username}`, {
//             headers: {
//                 'X-API-KEY': process.env.VITE_TIK_API,
//                 'accept': 'application/json'
//             }
//         })
//         // const response = await axios.get('https://api.tikapi.io' + req.url);
//         // res.json(response.data);
//         // console.log(req.query.username)
//         // let response = await api.public.check({
//         //     username: req.query.username
//         // });

//         // console.log(response.data)
//         // console.log(response.data.userInfo)
//         // console.log(response.data.userInfo.user)
        
//         if (!response || !response.data || !response.data.userInfo || !response.data.userInfo.user) {
//             throw new Error("No valid user data.");
//         } else {
//             secUid = response.data.userInfo.user.secUid;
//         }
//         if (!secUid) {
//             throw new Error("secUid not found for the specified user.");
//         }

//         console.log("secUid response", secUid)

//         // send back the secUid
//         res.send(secUid);
//     } catch (error) {
//         console.error('Error calling TikAPI:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/page1', async (req, res) => {
//     // Validate request body
//     if (!req.body || !req.body.page || !req.body.message) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Validate page field
//     if (req.body.page !== 'username') {
//         return res.status(400).json({ error: 'Invalid page value' });
//     }

//     try {
//         const { message } = req.body;
//         const response = await openai.chat.completions.create({
//             messages: [{ role: "system", content: message }],
//             model: "gpt-3.5-turbo",
//         });
//         console.log(response.choices[0].message.content);
//         res.json({ message: response.choices[0].message.content });
//         // send error back to 
//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/page2', async (req, res) => {
//     if (req.body.page === 'city') {
//         // Handle OpenAI API call for Page 2
//         const { message } = req.body;
//         const response = await openai.chat.completions.create({
//             messages: [{ role: "system", content: message }],
//             model: "gpt-3.5-turbo",
//         });
//         console.log(response.choices[0].message.content);
//         res.json({ message: response.choices[0].message.content });
//     }
// });

// app.post('/page3', async (req, res) => {
//     if (req.body.page === 'city') {
//         // Handle OpenAI API call for Page 2
//         const { message } = req.body;
//         const response = await openai.chat.completions.create({
//             messages: [{ role: "system", content: message }],
//             model: "gpt-3.5-turbo",
//         });
//         console.log(response.choices[0].message.content);
//         res.json({ message: response.choices[0].message.content });
//     }
// });

// app.listen(port, () => {
//     console.log('Example page listening');
// });
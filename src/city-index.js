// a express server, which will handle api requests coming in and respond back with a json object, it will use body parser as well as cross
//const OpenAI = require('openai');
//import { Configuration, OpenAIApi } from 'openai';

import OpenAI from "openai";
//import Configuration from "openai";

const openai = new OpenAI({
    organization: "org-8bI3ic6DaEmTHbOgwzbZvS5L",
    apiKey: import.meta.env.VITE_CHATTY_KEY,
});

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: message }],
        model: "gpt-3.5-turbo",
    });
    console.log(response.choices[0]);
});

app.listen(port, () => {
    console.log('Example app listening');
});
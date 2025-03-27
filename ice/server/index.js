import express from "express";
import config from './service/config.js';

const app = express();
const port = 3000;

app.use(express.static('public'));  

config(app); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
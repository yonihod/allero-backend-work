const axios = require('axios');
require('dotenv').config()
const { GITHUB_TOKEN} = process.env;

const axiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {'Authorization': `token ${GITHUB_TOKEN}`},
})

module.exports.api = axiosInstance
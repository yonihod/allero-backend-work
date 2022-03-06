const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {'Authorization': 'token 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'},
})

module.exports.api = axiosInstance
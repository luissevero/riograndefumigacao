import axios from 'axios'
/*
const api = axios.create({
    baseURL: 'http://127.0.0.1:3006/',
});
*/


const apiLocal = axios.create({
    baseURL: 'http://192.168.0.250:3006/'
})

const api = axios.create({
    baseURL: 'http://187.86.138.21:3006/'
})

const localUrl = 'http://192.168.0.250:3006/'
const onlineUrl = 'http://187.86.138.21:3006/'

export {api, apiLocal, localUrl, onlineUrl}
import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://rgfumigacao.com.br/api/client/',
})

const apiEmployee = axios.create({
    baseURL: 'http://rgfumigacao.com.br/api/employee/',
})

export {apiClient, apiEmployee}
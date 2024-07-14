import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://localhost:3333' //change based on where backend is running on machine

})
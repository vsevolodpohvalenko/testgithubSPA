import axios from "axios";

const url = 'https://api.github.com/'

export const config = {
    headers: {
        'Content-Type' : 'application/json'
    }
}

export const instance = axios.create({
    baseURL: url,
})